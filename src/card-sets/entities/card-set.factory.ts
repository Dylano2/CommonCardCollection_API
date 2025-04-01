import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@src/seeds/seed.utils';
import { CardSet } from '@src/card-sets/entities/card-set.entity';

export const CardSetFactory = setSeederFactory(CardSet, () => {
  const cardSet: CardSet = new CardSet();
  cardSet.createdAt = faker.date.past();
  cardSet.updatedAt = faker.date.recent();
  return cardSet;
});