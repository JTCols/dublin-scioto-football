import {Component, OnInit, ViewChild} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-sf-results',
  templateUrl: './sf-results.component.html',
  imports: [
    AgGridAngular,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./sf-results.component.scss']
})
export class SfResultsComponent implements OnInit {
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
  // Add loading indicator
  loading = true;
  error = false;
  errorMessage = '';
  
  // For quick filtering
  public quickFilterText: string = '';
  
  // Track active tab
  public activeTab: string = 'varsity';
  
  _resultData: any[] = [];

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'season', headerName: 'Season', width: 100},
    {field: 'location', headerName: 'Home/Away', width: 110},
    {field: 'opponent', headerName: 'Opponent', width: 150},
    {field: 'score', headerName: 'Scioto Score', width: 120},
    {field: 'oppscore', headerName: 'Opponent Score', width: 140},
    {field: 'result', headerName: 'Result', width: 100},
    {field: 'comment', headerName: 'Notes', flex: 1, minWidth: 150}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100
  };

  constructor(private apiService: SfApiService) {
  }
  
  ngOnInit() {
    // Load data on initialization
    this.loadVarsity();
  }

  // Quick filter function
  onFilterTextBoxChanged() {
    this.agGrid.api.setGridOption('quickFilterText', this.quickFilterText);
  }

  // Load data when grid is ready
  onGridReady(params: GridReadyEvent) {
    console.log('Grid ready event fired');
    // If data is already loaded, refresh the grid
    if (this._resultData && this._resultData.length > 0) {
      params.api.setGridOption('rowData', this._resultData);
    }
  }

  loadData(level?: string, season?: string) {
    this.loading = true;
    this.error = false;
    console.log(`Loading game results for level: ${level}, season: ${season}`);
    
    this.apiService.getGameResults(level, season).subscribe({
      next: (response) => {
        console.log('Results API response:', response);
        
        if (response && response.resultsData && response.resultsData.length > 0) {
          this._resultData = response.resultsData;
          console.log('Loaded results data:', this._resultData);
          
          // Update grid if it's ready
          if (this.agGrid && this.agGrid.api) {
            this.agGrid.api.setGridOption('rowData', this._resultData);
          }
        } else {
          console.warn('No results data found in response');
          this._resultData = [];
          this.error = true;
          this.errorMessage = 'No results data available.';
          
          // Show empty data in grid
          if (this.agGrid && this.agGrid.api) {
            this.agGrid.api.setGridOption('rowData', []);
          }
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading game results:', err);
        this.error = true;
        this.errorMessage = 'Failed to load game results. Please try again later.';
        this._resultData = [];
        this.loading = false;
        
        // Show empty data in grid
        if (this.agGrid && this.agGrid.api) {
          this.agGrid.api.setGridOption('rowData', []);
        }
      }
    });
  }

  loadJV() {
    this.activeTab = 'jv';
    this.loadData("jv", "");
  }

  loadFrosh() {
    this.activeTab = 'frosh';
    this.loadData("frosh", "");
  }

  loadVarsity() {
    this.activeTab = 'varsity';
    this.loadData("varsity", "");
  }
}
