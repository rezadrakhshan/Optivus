import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { UserService } from 'src/providers/user.service';

@Injectable()
export class SelfActionService {
  constructor(private readonly userService: UserService) {}
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
