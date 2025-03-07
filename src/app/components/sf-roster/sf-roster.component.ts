import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {CellClickedEvent, ColDef, GridApi, GridReadyEvent} from "ag-grid-community";
import {SfApiService} from "../../services/api/sf-api.service";

@Component({
  standalone: true,
  selector: 'app-sf-roster',
  templateUrl: './sf-roster.component.html',
  imports: [
    AgGridAngular
  ],
  styleUrls: ['./sf-roster.component.scss']
})

export class SfRosterComponent implements OnInit {

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public _rosterData: any[] = [];
  private resizeObserver: ResizeObserver;

  //private gridApi!: GridApi<any>;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'number'},
    {field: 'firstName'},
    {field: 'lastName'},
    {field: 'grade'},
    {field: 'height'},
    {field: 'weight'},
    {field: 'position'},
    // {field: 'role'},
    //{field: 'season'},

  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private apiService: SfApiService, private host: ElementRef, private zone: NgZone) {
  }


  ngOnInit() {
    this.resizeObserver = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      console.log(width);
      this.zone.run(() => {
        this.sizeToFit()
      });
    });
    this.resizeObserver.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver.unobserve(this.host.nativeElement);
  }

  sizeToFit() {
    this.agGrid.api.sizeColumnsToFit({
      defaultMinWidth: 50,
      columnLimits: [
        {key: 'number', maxWidth: 55},
        {key: 'firstName', minWidth: 100},
        {key: 'lastName', minWidth: 100},
        {key: 'grade', maxWidth: 95},
        {key: 'height', maxWidth: 100},
        {key: 'weight', maxWidth: 100}
      ],
    });
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

        this.sizeToFit();
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
