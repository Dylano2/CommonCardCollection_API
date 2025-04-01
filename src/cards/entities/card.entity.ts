import { HideField, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@src/users/entities/user.entity';
import { Timestampable } from '@src/timestampable/timestampable.interface';
import { CardSet } from '@src/card-sets/entities/card-set.entity';

@ObjectType()
@Entity()
export class Card implements Timestampable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  reference: string;

  @Column()
  name: string;

  @Column('json')
  cardType: Record<string, any>;

  @Column('json')
  cardExtension: Record<string, any>;

  @Column('json')
  rarity: Record<string, any>;

  @Column()
  imagePath: string;

  @Column('json')
  assets: Record<string, any>;

  @Column()
  qrUrlDetail: string;

  @Column('json')
  mainFaction: Record<string, any>;

  @Column('json')
  elements: Record<string, string>;

  @Column()
  isSuspended: boolean;

  @ManyToMany(() => CardSet, (cardSet) => cardSet.cards)
  cardSet: CardSet;

  @ManyToOne(() => User, (user) => user.cards)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @HideField()
  @DeleteDateColumn()
  deletedAt?: Date;


}
