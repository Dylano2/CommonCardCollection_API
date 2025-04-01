import { setSeederFactory } from 'typeorm-extension';
import { User } from '@src/users/entities/user.entity';
import { faker } from '@src/seeds/seed.utils';

export const UserFactory = setSeederFactory(User, () => {
  const user: User = new User();

  user.nickname = faker.internet.username();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.createdAt = faker.date.past();
  user.updatedAt = faker.date.recent();

  return user;
});
