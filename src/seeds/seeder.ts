import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import {
  askQuestion,
  closeReadline,
  faker,
  logEnd,
  logProgress,
  logStart
} from '@src/seeds/seed.utils';
import { User } from '@src/users/entities/user.entity';
import { Card } from '@src/cards/entities/card.entity';
import { CardSet } from '@src/card-sets/entities/card-set.entity';

const QUANTITY = 5 as const;

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {
    const drop = await askQuestion(
      'Faut-il drop la database (Y/n) ?',
      'y',
      'yes/no'
    );

    console.log('🧮 Préparation de la BDD en cours...');
    if (!drop) {
      await dataSource.synchronize();
    } else if (drop) {
      await dataSource.synchronize(true);
    }

    closeReadline();

    const userRepository: Repository<User> = dataSource.getRepository(User);
    const userCount = await userRepository.count();
    if (userCount < 3) {
      const userFactory = factoryManager.get(User);

      logStart(User.name);
      const users: User[] = await Promise.all(
        Array(QUANTITY)
          .fill('')
          .map(async () => {
            logProgress();
            return await userFactory.make();
          })
      );
      await userRepository.save(users);

      logEnd();
    }

    const cardRepository: Repository<Card> = dataSource.getRepository(Card);
    const cardsInDbCount = await cardRepository.count();
    if (cardsInDbCount < 10) {
      console.log('Fetching cards from API...');
      const response = await fetch('https://api.altered.gg/cards');

      const usersForCards = await userRepository.find();
      if (!response.ok) {
        throw new Error(`Failed to fetch cards: ${response.statusText}`);
      }

      const rawText = await response.text();

      const json = JSON.parse(rawText);
      const cards = json['hydra:member'];
      console.log(`Fetched ${cards.length} cards. Inserting into DB...`);
      for (const card of cards) {
        const newCard = cardRepository.create({
          reference: card.reference,
          name: card.name,
          cardType: card.cardType,
          cardExtension: card.cardSet,
          rarity: card.rarity,
          imagePath: card.imagePath,
          assets: card.assets,
          qrUrlDetail: card.qrUrlDetail,
          mainFaction: card.mainFaction,
          elements: card.elements,
          isSuspended: card.isSuspended,
          owner: faker.helpers.arrayElement(usersForCards)
        });

        await cardRepository.save(newCard);
      }
    } else {
      console.log(`No need to seed Cards : Already ${cardsInDbCount} saved`);
    }

    const cardSetRepository: Repository<CardSet> =
      dataSource.getRepository(CardSet);
    const cardSetFactory = factoryManager.get(CardSet);

    logStart(CardSet.name);
    const cardSets: CardSet[] = await Promise.all(
      Array(QUANTITY)
        .fill('')
        .map(async () => {
          logProgress();
          return await cardSetFactory.make({});
        })
    );
    await cardSetRepository.save(cardSets);
    logEnd();

    const cardsInDb: Card[] = await cardRepository.find({
      relations: { owner: true }
    });
    for (const cardSet of cardSets) {
      const cardsToPutInSet = faker.helpers.arrayElements(cardsInDb, {
        min: 3,
        max: 10
      });

      const ownersOfCardsToPutInSet: User[] = [];
      for (const cardToPutInSet of cardsToPutInSet) {
        if (
          !ownersOfCardsToPutInSet.some(
            (user: User) => user.id === cardToPutInSet.owner.id
          )
        ) {
          ownersOfCardsToPutInSet.push(cardToPutInSet.owner);
        }
      }

      cardSet.cards = cardsToPutInSet;

      await cardSetRepository.save(cardSet);
      for (const user of ownersOfCardsToPutInSet) {
        if (!user.cardSets) {
          user.cardSets = [];
        }

        user.cardSets.push(cardSet);
        console.log(user);
      }

      await userRepository.save(ownersOfCardsToPutInSet);
    }

    console.log('✅  Seeding terminé ! ✅  👌 ');
  }
}
