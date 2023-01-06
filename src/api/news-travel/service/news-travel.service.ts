import { NewsTravelDB } from './../../../database/entity/news-travel.entity';
import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from 'src/helper/services/log.service';
import { DataBase } from 'src/database/database.providers';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class NewsTravelService implements OnApplicationBootstrap {
  private logger = new LogService(NewsTravelService.name);

  constructor(
    @Inject(DataBase.NewsTravelDB) private readonly newsTravelRepository: typeof NewsTravelDB,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,

  ) { }

  onApplicationBootstrap() {
    //
  }
  async findOne(id: number): Promise<NewsTravelDB> {
    const tag = this.findOne.name;
    try {
      const newsTravel = await this.newsTravelRepository.findByPk<NewsTravelDB>(id);
      return newsTravel;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
