import {Component, ViewChild} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, GridReadyEvent} from "ag-grid-community";

@Component({
  standalone: true,
  selector: 'app-sf-results',
  templateUrl: './sf-results.component.html',
  imports: [
    AgGridAngular
  ],
  styleUrls: ['./sf-results.component.scss']
})
export class SfResultsComponent {
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
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

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'season'},
    {field: 'location'},
    {field: 'opponent'},
    {field: 'score'},
    {field: 'oppscore'},
    {field: 'result'},
    {field: 'comment'}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private apiService: SfApiService) {
  }

  //load data from sever
  onGridReady(params: GridReadyEvent) {
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
    this.loadData("jv", "");
  }

  loadFrosh() {
    this.loadData("frosh", "");
  }

  loadVarsity() {
    this.loadData("", "");
  }
}
