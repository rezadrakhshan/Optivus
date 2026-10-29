import { DataSource } from 'typeorm';
import { Profile } from '../entities/user/profile.entity';

export const profileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
];
