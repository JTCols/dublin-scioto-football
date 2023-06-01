import {AfterViewInit, Component} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";

@Component({
  selector: 'app-sf-schedule',
  templateUrl: './sf-schedule.component.html',
  styleUrls: ['./sf-schedule.component.scss']
})
export class SfScheduleComponent implements AfterViewInit {
  _allSeasonData: any = [];
  _currentSeasonData: any = [];
  _previousResults: any = [];


  constructor(private apiService: SfApiService) {
  }

  ngAfterViewInit() {
    this.loadVarsity();
  }

  /**
   * Process the data returned from the spreadsheet
   *
   * @param scheduleData
   * @param year
   */
  processResults(scheduleData: string[], year?: string){
    this._allSeasonData = [];
    for (let game of scheduleData) {
      let retData: any = {
        gameId: game[0],
        sciotoScore: game[1],
        opponentScore: game[2],
        opponent: game[3],
        result: game[4],
        year: game[5],
        location: game[6],
        date: game[7],
        note: game[8]
      };
      this._allSeasonData.push(retData);
    }
    this._currentSeasonData = this._allSeasonData.filter((season: any) => season.year === year);
  }

  processPrevious(opponent: string): any[]{
    return this._allSeasonData.filter((game: any) => game.opponent === opponent);

  }

  /**
   * Load the data from the api service
   *
   * @param level
   * @param season
   */
  loadData(level?: string, season?: string) {
    this.apiService.getScheduleResults(level, season).subscribe(response => {
      if (response.values && response.values.length > 0) {
        this.processResults(response.values, season);
      }
    });

  }

  loadJV() {
    this.loadData("jv", "2023");
  }

  loadFrosh() {
    this.loadData("freshman", "2023");
  }

  loadVarsity() {
    this.loadData("varsity", "2023");
  }
}
