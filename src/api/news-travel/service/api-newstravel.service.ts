import { forwardRef, HttpException, HttpStatus, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { DataBase } from 'src/database/database.providers';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { NewsTravelDB } from './../../../database/entity/news-travel.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { LogService } from 'src/helper/services/log.service';
import { CreateNewsTravelReqDto } from '../dto/create-news-travel.dto';
import { FindOneNewsTravelResDTO } from '../dto/findOne.dto';
import { NewsTravelService } from './news-travel.service';

@Injectable()
export class ApiNewsTravelService implements OnApplicationBootstrap {
    private logger = new LogService(ApiNewsTravelService.name);

    constructor(
        @Inject(DataBase.NewsTravelDB) private newsTravelRepository: typeof NewsTravelDB,
        @Inject('SEQUELIZE') private sequelize: Sequelize,
        @Inject(forwardRef(() => NewsTravelService)) private newsTravelService: NewsTravelService,

    ) { }

    onApplicationBootstrap() {
        //
    }

    async api_create(body: CreateNewsTravelReqDto) {
        const tag = this.api_create.name;
        try {
            const newsTravel = new NewsTravelDB();
            newsTravel.title = body.title;
            newsTravel.img = body.img;
            await newsTravel.save();
            return newsTravel;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_findOne(id: number): Promise<FindOneNewsTravelResDTO> {
        const tag = this.api_findOne.name;
        try {
            const findData = await this.newsTravelService.findOne(id);
            return new FindOneNewsTravelResDTO(ResStatus.success, '', findData);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
