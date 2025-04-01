import { Module } from '@nestjs/common';
import { CardSetsService } from '@src/card-sets/card-sets.service';
import { CardSetsResolver } from '@src/card-sets/card-sets.resolver';


@Module({
  providers: [CardSetsService, CardSetsResolver],
})
export class CardSetsModule {
}
