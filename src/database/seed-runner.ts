import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { runSeeds } from './seeds';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
});

const seedDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log('Conexión a la base de datos establecida');
    
    await runSeeds(dataSource);
    
    await dataSource.destroy();
    console.log('Conexión a la base de datos cerrada');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();