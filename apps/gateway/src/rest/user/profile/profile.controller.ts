import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dtos';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User:Porfile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  @ApiOperation({ summary: 'Update profile' })
  async updateProfile(@Body() data: UpdateProfileDto, @Req() req: Request) {
    return this.profileService.updateProfile(data, req);
  }

  @Get()
  @ApiOperation({ summary: 'Get profile detail' })
  async getProfile(@Req() req: Request) {
    return this.profileService.getProfile(req);
  }
}
