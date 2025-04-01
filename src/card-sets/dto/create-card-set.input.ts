import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCardSetInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
