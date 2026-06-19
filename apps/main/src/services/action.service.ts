import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { CategoryService } from 'src/providers/category.service';
import { LeadService } from 'src/providers/lead.service';
import { ProfileService } from 'src/providers/profile.service';
import { UserService } from 'src/providers/user.service';

@Injectable()
export class SelfActionService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly leadService: LeadService,
    private readonly categoryService: CategoryService,
  ) {}
  async findAndCall(data) {
    const providerName = data.provider || null;
    const actionName = data.action || null;

    if (!providerName || !actionName)
      throw new Error('err_service_noActionOrProvider');

    let provider: any;
    switch (providerName) {
      case 'USERS':
        provider = this.userService;
        break;

      case 'PROFILE':
        provider = this.profileService;
        break;
      case 'LEAD':
        provider = this.leadService;
        break;
      case 'CATEGORY':
        provider = this.categoryService;
        break;
      default:
        provider = null;
        break;
    }
    if (!provider || !provider[actionName])
      throw new Error('err_service_actionNotFound');
    const response = await provider[actionName](
      _.pick(data, ['query', 'set', 'options']),
    );
    return {
      message: response.message ?? 'ok',
      data: response.data ?? response,
    };
  }
}
