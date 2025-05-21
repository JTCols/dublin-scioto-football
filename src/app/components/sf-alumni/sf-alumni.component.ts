import {Component, ViewChild} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-sf-alumni',
  templateUrl: './sf-alumni.component.html',
  imports: [
    AgGridAngular,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./sf-alumni.component.scss']
})
export class SfAlumniComponent {

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public alumData: any[] = [];
  
  // For quick filtering
  public quickFilterText: string = '';

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'number', headerName: 'Number', width: 100, filter: 'agNumberColumnFilter'},
    {field: 'firstName', headerName: 'First Name', width: 120},
    {field: 'lastName', headerName: 'Last Name', width: 120},
    {field: 'gradYear', headerName: 'Grad Year', width: 110, filter: 'agNumberColumnFilter'},
    {field: 'position', headerName: 'Position', width: 120},
    {field: 'collegeSport', headerName: 'College Sport', width: 140},
    {field: 'college', headerName: 'College', width: 180}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
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
    // Clear existing data
    this.alumData = [];
    
    // Skip header row if present
    const dataRows = alumRawData.length > 0 && 
                    (alumRawData[0][1] === 'firstName' || alumRawData[0][1] === 'First Name') 
                    ? alumRawData.slice(1) : alumRawData;
                    
    for (let alumItem of dataRows) {
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
    api.setGridOption('rowData', this.alumData);
  }

  // Quick filter function
  onFilterTextBoxChanged() {
    this.agGrid.api.setGridOption('quickFilterText', this.quickFilterText);
  }

  //load data from sever
  onGridReady(params: GridReadyEvent) {
    this.apiService.getAlumni().subscribe({
      next: (response) => {
        if (response.values && response.values.length > 1) {
          this.processAlumData(response.values, params.api);
        }
      },
      error: (err) => {
        console.error('Error loading alumni data:', err);
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
