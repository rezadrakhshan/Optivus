import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOtp } from './dto';

@ApiTags('User:Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  @ApiOperation({ summary: 'send otp for verify phone number' })
  async sendOtp(@Body() data: SendOtp) {
    return this.authService.sendOtp(data)
  }
}
