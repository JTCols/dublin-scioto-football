import {AfterViewInit, Component} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";

@Component({
  selector: 'app-sf-schedule',
  templateUrl: './sf-schedule.component.html',
  styleUrls: ['./sf-schedule.component.scss']
})
export class SfScheduleComponent implements AfterViewInit {
  _resultData: any = [{
    game: "",
    season: "",
    gamenum: "",
    location: "",
    opponent: "",
    oppscore: "",
    preview: "",
    score: "",
    result: "",
    comment: ""
  }];

  constructor(private apiService: SfApiService) {
  }

  ngAfterViewInit() {
    this.loadVarsity();
  }

  loadData(level?: string, season?: string) {
    this.apiService.getGameResults(level, season).subscribe(response => {
      if (response.resultsData && response.resultsData.length > 0) {
        this._resultData = response.resultsData;
      }
    });
  }

  loadJV() {
    this.loadData("jv", "2023");
  }

  loadFrosh() {
    this.loadData("frosh", "2023");
  }

  loadVarsity() {
    this.loadData("", "2023");
  }
}
