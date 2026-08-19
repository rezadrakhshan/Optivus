import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dtos';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('User:Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update profile' })
  async updateProfile(
    @Body() data: UpdateProfileDto,
    @Req() req: Request,
    @UploadedFile() image,
  ) {
    return this.profileService.updateProfile(data, req, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get profile detail' })
  async getProfile(@Req() req: Request) {
    return this.profileService.getProfile(req);
  }
}
