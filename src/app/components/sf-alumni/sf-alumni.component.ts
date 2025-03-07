import {Component, ViewChild} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  standalone: true,
  selector: 'app-sf-alumni',
  templateUrl: './sf-alumni.component.html',
  imports: [
    AgGridAngular
  ],
  styleUrls: ['./sf-alumni.component.scss']
})
export class SfAlumniComponent {

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public alumData: any[] = [];

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'number'},
    {field: 'firstName'},
    {field: 'lastName'},
    {field: 'gradYear'},
    {field: 'position'},
    {field: 'collegeSport'},
    {field: 'college'}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private apiService: SfApiService) {
  }

  checkEmpty(item: string) {
    if (item && item.length !== 0) {
      return item;
    }
    return "";
  }

  /**
   * The data from Google Sheets isn't in the state that we need, a little preprocessing is needed.
   *
   * @param alumRawData - raw data from Google Sheets JSON endpoint
   * @param api - The ng-grid api
   * @private
   */
  private processAlumData(alumRawData: string[], api: any): void {
    for (let alumItem of alumRawData) {
      let retData: any = {
        number: alumItem[0],
        firstName: alumItem[1],
        lastName: alumItem[2],
        gradYear: alumItem[3],
        position: alumItem[4],
        collegeSport: this.checkEmpty(alumItem[5]),
        college: this.checkEmpty(alumItem[6]),
      };
      this.alumData.push(retData);
    }
    api.setRowData(this.alumData);
  }


  //load data from sever
  onGridReady(params: GridReadyEvent) {
    this.apiService.getAlumni().subscribe(response => {
      if (response.values && response.values.length > 1) {
        this.processAlumData(response.values, params.api)
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
