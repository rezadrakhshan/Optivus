import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '8d left',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: String,
    required: true,
    example: 'eight-days-left-to-expire',
  })
  slug: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
