import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '@src/seeds/seeder';


console.log(`Démarrage des seeds`);

const options: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['./src/**/*.entity.{ts,js}'],
  factories: ['./src/**/*.factory.{ts,js}'],
  seeds: [MainSeeder],
};

const dataSource: DataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await runSeeders(dataSource);
    process.exit();
  })
  .catch((e) => {
    console.log(e);
    throw new Error(e);
  });
