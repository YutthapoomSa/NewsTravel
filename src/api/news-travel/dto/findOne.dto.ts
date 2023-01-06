import { NewsTravelDB } from './../../../database/entity/news-travel.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResStatus } from 'src/shared/enum/res-status.enum';

export class FindOneNewsTravelResDTOData {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    img: string;
}

export class FindOneNewsTravelResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneNewsTravelResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneNewsTravelResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: NewsTravelDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneNewsTravelResDTOData();;

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.title = datas.title;
            this.resData.img = datas.img;
        }
    }
}