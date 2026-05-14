import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from './dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('User:Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('send-otp')
  @ApiOperation({ summary: 'send otp for verify phone number' })
  async sendOtp(@Body() data: SendOtpDto) {
    return this.authService.sendOtp(data);
  }

  @Public()
  @Post('verify-otp')
  @ApiOperation({ summary: 'verify otp and generate jwt' })
  async verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data);
  }
  @Get('profile')
  @ApiOperation({ summary: 'This is test api for auth guard' })
  async profile() {
    return 'This Profile';
  }
}
