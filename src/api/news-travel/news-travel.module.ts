import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { NewsTravelController } from './news-travel.controller';
import { ApiNewsTravelService } from './service/api-newstravel.service';
import { NewsTravelService } from './service/news-travel.service';

@Module({
  imports: [SharedModule],
  controllers: [NewsTravelController],
  providers: [NewsTravelService,ApiNewsTravelService],
  exports: [NewsTravelService]
})
export class NewsTravelModule {}
