import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
export class SendOtp {
  @ApiProperty({
    type: Number,
    required: true,
    example: '+980000000000',
    description: 'user phone number',
  })
  @IsPhoneNumber('IR', { message: 'pleas enter valid phone number' })
  phone: string;
}
