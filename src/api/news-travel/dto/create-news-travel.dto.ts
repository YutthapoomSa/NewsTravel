import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsTravelReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    img: string;
}


export class CreateNewsTravelResDTOData {
    @ApiProperty()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    img: string
}
