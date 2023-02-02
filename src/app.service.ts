import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  region: string;
  summonerName: string;
  key: string;
  continent: string;
  constructor(private httpService: HttpService) {}

  async getLolPuuidWithSummonerName() {

    this.region = 'euw1';
    this.key = process.env.keylol;
    this.summonerName = 'Mumurolog0';
    const url = `https://${this.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.summonerName}?api_key=${this.key}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data.puuid;
  }

  async getMatchesWithPuuid(){
    
    this.continent = 'europe'
    const puuid = await this.getLolPuuidWithSummonerName();
    this.key = process.env.keylol;
    const url = `https://${this.continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.key}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;

  }

  async getMatchesData(){

    let win = []
    this.continent = 'europe'
    const match_id = await this.getMatchesWithPuuid();
    this.key = process.env.keylol;
    for (let ind = 0; ind < match_id.length; ind++) {

      const url = `https://${this.continent}.api.riotgames.com/lol/match/v5/matches/${match_id[ind]}?api_key=${this.key}`;
      const { data } = await firstValueFrom(this.httpService.get(url));
      let index = 0
      Logger.log(data.info.participants.length)

      while (index < data.info.participants.length) {
        
        if (data.info.participants[index].summonerName == this.summonerName) {
        
          win.push(data.info.participants[index].win);
          index++;

        }else {

          index++;

        }
      }
    }

    return (win);

  }
}
