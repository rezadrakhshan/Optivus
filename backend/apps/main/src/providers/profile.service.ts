import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Profile } from 'src/databases/postgres/entities/user/profile.entity';
import { User } from 'src/databases/postgres/entities/user/user.entity';
import { ServiceResponseData, SrvError } from 'src/services/dto';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: Repository<User>,
    @Inject('PROFILE_REPOSITORY')
    private readonly profileRepo: Repository<Profile>,
  ) {}

  async updateProfile({ query }): Promise<ServiceResponseData> {
    const user: any = await this.userRepo.findOne({ where: { id: query.id } });
    let profile: any = await this.profileRepo.findOne({
      where: { id: user.profile },
    });
    if (!profile) throw new SrvError(HttpStatus.BAD_REQUEST, 'User not found');
    profile = await this.profileRepo.update(profile.id, query.data);
    return {
      message: 'profile updated',
      data: {
        success: true,
        data: query.data,
      },
    };
  }

  async getProfile({ query }): Promise<ServiceResponseData> {
    const user: any = await this.userRepo.findOne({ where: { id: query } });
    const profile = await this.profileRepo.findOne({
      where: { id: user?.profile },
    });
    if (!profile) throw new SrvError(HttpStatus.BAD_REQUEST, 'User not found');
    return {
      message: 'profile detail is here!',
      data: {
        success: true,
        data: _.pick(profile, [
          'firstName',
          'lastName',
          'email',
          'position',
          'company',
          'location',
          'image',
        ]),
      },
    };
  }
}
