import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {CellClickedEvent, ColDef, GridApi, GridReadyEvent} from "ag-grid-community";
import {SfApiService} from "../../services/api/sf-api.service";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-sf-roster',
  templateUrl: './sf-roster.component.html',
  imports: [
    AgGridAngular,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  styleUrls: ['./sf-roster.component.scss']
})

export class SfRosterComponent implements OnInit, OnDestroy {

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public _rosterData: any[] = [];
  public paginatedRosterData: any[] = [];
  public filteredRosterData: any[] = [];
  public searchText: string = '';
  private resizeObserver!: ResizeObserver;

  // Pagination variables
  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;
  totalRows = 0;

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
        if (this.agGrid?.api) {
          this.sizeToFit();
        }
      });
    });
    this.resizeObserver.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.host.nativeElement);
      this.resizeObserver.disconnect();
    }
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


  private processRosterData(rosterRawData: any[]): void {
    // Clear existing data to prevent duplicates
    this._rosterData = [];
    
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
    
    this.filteredRosterData = [...this._rosterData];
    // After processing data, set up pagination
    this.updateTotalRowsAndPagination();
  }
  
  private updateTotalRowsAndPagination(): void {
    this.totalRows = this.filteredRosterData.length;
    this.pageIndex = 0; // Reset to first page when filter changes
    this.updatePaginatedData();
  }
  
  // Update the paginated data based on current page settings
  private updatePaginatedData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRosterData = this.filteredRosterData.slice(startIndex, endIndex);
  }
  
  // Handle page changes
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }
  
  // Filter the roster data based on search text
  applyFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredRosterData = [...this._rosterData];
    } else {
      const searchTerms = this.searchText.toLowerCase().trim().split(' ');
      
      this.filteredRosterData = this._rosterData.filter(player => {
        // Check if all search terms match any field
        return searchTerms.every(term => {
          return Object.values(player).some(value => 
            value && value.toString().toLowerCase().includes(term)
          );
        });
      });
    }
    
    this.updateTotalRowsAndPagination();
  }
  
  // Clear the search filter
  clearFilter(): void {
    this.searchText = '';
    this.applyFilter();
  }

  //load data from sever
  onGridReady(params: GridReadyEvent) {
    this.apiService.getRoster().subscribe(response => {
      if (response.values && response.values.length > 1) {
        this.processRosterData(response.values);
        
        // Only call sizeToFit if grid API is available
        if (this.agGrid?.api) {
          this.sizeToFit();
        }
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
