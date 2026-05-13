import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class SendOtpDto {
  @ApiProperty({
    type: Number,
    required: true,
    example: '+980000000000',
    description: 'user phone number',
  })
  @IsPhoneNumber('IR', { message: 'pleas enter valid phone number' })
  phone: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    type: Number,
    required: true,
    example: '+980000000000',
    description: 'user phone number',
  })
  @IsPhoneNumber('IR', { message: 'pleas enter valid phone number' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
