import {AfterViewInit, Component, SecurityContext} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelTitle} from "@angular/material/expansion";

@Component({
  standalone: true,
  selector: 'app-sf-schedule',
  templateUrl: './sf-schedule.component.html',
  imports: [
    NgForOf,
    DatePipe,
    MatIcon,
    NgIf,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    NgStyle
  ],
  styleUrls: ['./sf-schedule.component.scss']
})
export class SfScheduleComponent implements AfterViewInit {
  _allSeasonData: any = [];
  _currentSeasonData: any = [];
  _previousResults: any = [];


  constructor(private apiService: SfApiService,  private sanitizer: DomSanitizer) {
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
        note: game[8],
        gameImg: game[9],
        maxPreps: game[10],
        tickets: game[11]
      };
      this._allSeasonData.push(retData);
    }
    this._currentSeasonData = this._allSeasonData.filter((season: any) => season.year === year);
  }

  buildAnalytics(data: any[]){

  }


  processPrevious(opponent: string): any[]{
    let retData = this._allSeasonData.filter((game: any) => game.opponent === opponent);
    this.buildAnalytics(retData);
    return retData;
  }

  sanitizeURL(url: string) {
    let retVal = this.sanitizer.sanitize(SecurityContext.URL, url);
    return retVal || "";
  }

  navigateToLink(url: string){
    if (url) window.open(this.sanitizeURL(url), "_blank");
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
    this.loadData("jv", "2024");
  }

  loadFrosh() {
    this.loadData("freshman", "2024");
  }

  loadVarsity() {
    this.loadData("varsity", "2024");
  }
}
