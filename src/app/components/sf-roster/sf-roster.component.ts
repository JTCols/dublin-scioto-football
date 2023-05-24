import {Component, ViewChild} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {SfApiService} from "../../services/api/sf-api.service";

@Component({
  selector: 'app-sf-roster',
  templateUrl: './sf-roster.component.html',
  styleUrls: ['./sf-roster.component.scss']
})
export class SfRosterComponent {

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public _rosterData: any[] = [];

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'number'},
    {field: 'firstName'},
    {field: 'lastName'},
    {field: 'grade'},
    {field: 'height'},
    {field: 'weight'},
    {field: 'position'},
    {field: 'role'},
    {field: 'season'},

  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private apiService: SfApiService) {
  }


  private processRosterData(rosterRawData: any[], api: any): void {
    for (let person of rosterRawData) {
      let retData: any = {
        number: person[0],
        firstName: person[1],
        lastName: person[2],
        grade: person[3],
        height: person [4],
        weight: person[5],
        position: person[6],
        role: person[7],
        season: person[8]
      };
      this._rosterData.push(retData);
    }
    api.setRowData(this._rosterData);
  }


  //load data from sever
  onGridReady(params: GridReadyEvent) {
    this.apiService.getRoster().subscribe(response => {
      if (response.values && response.values.length > 1) {
        this.processRosterData(response.values, params.api)
      }
    });
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }


}
