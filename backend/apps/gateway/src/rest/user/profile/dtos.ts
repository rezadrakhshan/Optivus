import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    type: String,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    example: 'Backend Developer',
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({
    type: String,
    example: 'Microsoft',
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({
    type: String,
    example: 'Iran',
  })
  @IsOptional()
  @IsString()
  location?: string;
}
