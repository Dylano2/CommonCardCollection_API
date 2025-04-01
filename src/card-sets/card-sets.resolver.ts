import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCardSetInput } from './dto/create-card-set.input';
import { UpdateCardSetInput } from './dto/update-card-set.input';
import { CardSet } from '@src/card-sets/entities/card-set.entity';
import { CardSetsService } from '@src/card-sets/card-sets.service';

@Resolver(() => CardSet)
export class CardSetsResolver {
  constructor(private readonly cardSetsService: CardSetsService) {
  }

  @Mutation(() => CardSet)
  createCardSet(@Args('createCardSetInput') createCardSetInput: CreateCardSetInput) {
    return this.cardSetsService.create(createCardSetInput);
  }

  @Query(() => [CardSet], { name: 'cardSets' })
  findAll() {
    return this.cardSetsService.findAll();
  }

  @Query(() => CardSet, { name: 'cardSet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cardSetsService.findOne(id);
  }

  @Mutation(() => CardSet)
  updateCardSet(@Args('updateCardSetInput') updateCardSetInput: UpdateCardSetInput) {
    return this.cardSetsService.update(updateCardSetInput.id, updateCardSetInput);
  }

  @Mutation(() => CardSet)
  removeCardSet(@Args('id', { type: () => Int }) id: number) {
    return this.cardSetsService.remove(id);
  }
}
