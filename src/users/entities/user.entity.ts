import { HideField, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Card } from '@src/cards/entities/card.entity';
import { Timestampable } from '@src/timestampable/timestampable.interface';
import { CardSet } from '@src/card-sets/entities/card-set.entity';

@ObjectType()
@Entity()
export class User implements Timestampable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @HideField()
  @Column()
  password: string;

  @OneToMany(() => Card, (card) => card.owner, {
    cascade: ['soft-remove']
  })
  cards: Card[];

  @JoinTable({ name: 'user-card_sets' })
  @ManyToMany(() => CardSet, (cardSet: CardSet) => cardSet.owners, {
    cascade: ['soft-remove']
  })
  cardSets: CardSet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @HideField()
  @DeleteDateColumn()
  deletedAt?: Date;
}
