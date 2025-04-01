import { Injectable } from '@nestjs/common';
import { CreateCardSetInput } from './dto/create-card-set.input';
import { UpdateCardSetInput } from './dto/update-card-set.input';

@Injectable()
export class CardSetsService {
  create(createCardSetInput: CreateCardSetInput) {
    return 'This action adds a new cardSet';
  }

  findAll() {
    return `This action returns all cardSets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardSet`;
  }

  update(id: number, updateCardSetInput: UpdateCardSetInput) {
    return `This action updates a #${id} cardSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardSet`;
  }
}
