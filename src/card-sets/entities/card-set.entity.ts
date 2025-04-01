import { HideField, ObjectType } from '@nestjs/graphql';
import { User } from '@src/users/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Timestampable } from '@src/timestampable/timestampable.interface';
import { Card } from '@src/cards/entities/card.entity';

@ObjectType()
@Entity()
export class CardSet implements Timestampable {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable({
    name: 'card_set-card'
  })
  @ManyToMany(() => Card, (card) => card.cardSet)
  cards: Card[];

  @ManyToMany(() => User, (user) => user.cardSets, {
    cascade: ['soft-remove']
  })
  owners: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @HideField()
  @DeleteDateColumn()
  deletedAt?: Date;
}
