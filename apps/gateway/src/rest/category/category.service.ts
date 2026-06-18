import { Injectable } from '@nestjs/common';
import { MainServiceClient } from 'src/services/main.service';

@Injectable()
export class CategoryService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}
}
