import * as config from 'config';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { User } from './entities/user/user.entity';

const logger = new Logger('PostgresService');

const cfg: any = config.get('postgres');

export const PostgresProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: cfg.host,
        port: cfg.port || 5432,
        username: cfg.user,
        password: cfg.password,
        database: cfg.database,
        entities: [User],
        synchronize: true,
      });

      try {
        const InitializeDataSource = await dataSource.initialize();
        logger.log('Connected to PostgreSql successfuly');
        return InitializeDataSource;
      } catch (error) {
        logger.error('Failed to connect to PostgreSql', error);
        process.exit(1);
      }
    },
  },
];
