import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {CellClickedEvent, ColDef, GridApi, GridReadyEvent} from "ag-grid-community";
import {SfApiService} from "../../services/api/sf-api.service";


@Component({
  standalone: true,
  selector: 'app-sf-links',
  templateUrl: './sf-links.component.html',
  imports: [
    AgGridAngular
  ],
  styleUrls: ['./sf-links.component.scss']
})
export class SfLinksComponent {

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public _linkData: any[] = [];
  private resizeObserver: ResizeObserver;
  //private gridApi!: GridApi<any>;


  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'title',
      headerName: 'Link Title',
      flex: 1,
      minWidth: 200,
      autoHeight: true,
      wrapText: true,
      cellRenderer: params => {
        return '<a href="' + params.data.link + '" target="_blank" rel="noopener">' + params.value + '</a>';
      }
    },
    {
      field: 'description', 
      headerName: 'Description',
      flex: 2,
      minWidth: 300,
      autoHeight: true,
      wrapText: true
    }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    autoHeight: true,
    wrapText: true
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
  autoSizeStrategy: {
    type: 'fitGridWidth',
  }
  ngOnDestroy() {
    this.resizeObserver.unobserve(this.host.nativeElement);
  }

  sizeToFit() {
    this.agGrid.api.sizeColumnsToFit({
      defaultMinWidth: 50,
      columnLimits: [
        // {key: 'link', maxWidth: 55},
        {key: 'title', minWidth: 50},
        {key: 'description', minWidth: 50}
      ],
    });
  }

  private processLinkData(linkRawData: any[], api: any): void {
    // Clear existing data
    this._linkData = [];
    
    for (let link of linkRawData) {
      let retData: any = {
        link: link[0],
        title: link[1],
        description: link[2]
      };
      this._linkData.push(retData);
    }
    api.setGridOption('rowData', this._linkData);
    
    // Ensure rows adjust to content after data is loaded
    setTimeout(() => {
      api.resetRowHeights();
    }, 0);
  }


  //load data from sever
  onGridReady(params: GridReadyEvent) {
    // We don't need to call setDomLayout as it's set in the HTML template
    
    this.apiService.getLinks().subscribe(response => {
      if (response.values && response.values.length > 1) {
        this.processLinkData(response.values, params.api)
        this.sizeToFit();
        
        // Ensure grid refreshes to adjust heights
        setTimeout(() => {
          params.api.resetRowHeights();
        }, 0);
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
