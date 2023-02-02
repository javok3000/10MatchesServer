import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getLolPuuidWithSummonerName() {
    return this.appService.getLolPuuidWithSummonerName();
  }

  @Get("lolParams")
  getMatchesWithPuuid() {
    return this.appService.getMatchesWithPuuid();
  }
  
  @Get("matches")
  getMatchesData(){
    return this.appService.getMatchesData();
  }
}
