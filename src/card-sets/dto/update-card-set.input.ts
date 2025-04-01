import { CreateCardSetInput } from './create-card-set.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCardSetInput extends PartialType(CreateCardSetInput) {
  @Field(() => Int)
  id: number;
}
