import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsTravelReqDto } from './dto/create-news-travel.dto';
import { FindOneNewsTravelResDTO } from './dto/findOne.dto';
import { ApiNewsTravelService } from './service/api-newstravel.service';

@ApiTags('NewsTravel')
@Controller('news-travel')
export class NewsTravelController {
  constructor(private readonly apiNewsTravelService: ApiNewsTravelService) { }

  @Post('CreateNewsTravel')
  @ApiOkResponse({ type: FindOneNewsTravelResDTO })
  create(@Body() body: CreateNewsTravelReqDto) {
    return this.apiNewsTravelService.api_create(body);
  }

  @Get(':id')
  findOne(@Param('idNewsTravel') id: number) {
    return this.apiNewsTravelService.api_findOne(id);
  }
}
