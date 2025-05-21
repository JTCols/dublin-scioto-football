import {AfterViewInit, Component, OnDestroy, OnInit, SecurityContext, NgZone} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelTitle} from "@angular/material/expansion";
import {Subscription} from "rxjs";
import {ImgFallbackDirective} from '../../directives/img-fallback.directive';

// Define interfaces for type safety
interface GameData {
  gameId: string;
  sciotoScore: string;
  opponentScore: string;
  opponent: string;
  result: string;
  year: string;
  location: string;
  date: string;
  note?: string;
  gameImg?: string;
  opponentImg?: string;
  maxPreps?: string;
  tickets?: string;
}

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
    NgStyle,
    ImgFallbackDirective
  ],
  styleUrls: ['./sf-schedule.component.scss']
})
export class SfScheduleComponent implements OnInit, AfterViewInit, OnDestroy {
  _allSeasonData: GameData[] = [];
  _currentSeasonData: GameData[] = [];
  _previousResults: GameData[] = [];
  
  // Track active tab
  activeTab: string = 'varsity';
  
  // Loading state
  isLoading: boolean = false;
  
  // Track subscriptions to avoid memory leaks
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: SfApiService, 
    private sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {}
  
  ngOnInit(): void {
    // Set initial loading state
    this.isLoading = true;
  }

  ngAfterViewInit(): void {
    // Use ngZone.run to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.ngZone.run(() => {
      this.loadVarsity();
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Process the data returned from the spreadsheet
   *
   * @param scheduleData - Raw schedule data from API
   * @param year - Optional year to filter by
   */
  processResults(scheduleData: string[][], year?: string): void {
    //console.log('Processing scheduleData:', scheduleData);
    
    this._allSeasonData = [];
    
    if (!scheduleData || !scheduleData.length) {
      //console.warn('No schedule data to process');
      return;
    }
    
    // Check if first row looks like a header
    const firstRow = scheduleData[0];
    const hasHeader = firstRow && 
      typeof firstRow[0] === 'string' && 
      (firstRow[0].toLowerCase().includes('id') || 
       firstRow[0].toLowerCase().includes('game'));
    
   // console.log('First row looks like a header:', hasHeader, firstRow);
    
    // Skip header row if present
    const dataRows = hasHeader ? scheduleData.slice(1) : scheduleData;
    
    for (const game of dataRows) {
     // console.log('Processing game data row:', game);
      
      if (game && game.length >= 7) { // Ensure at least required fields exist
        const gameData: GameData = {
          gameId: game[0] || '',
          sciotoScore: game[1] || '',
          opponentScore: game[2] || '',
          opponent: game[3] || '',
          result: game[4] || '',
          year: game[5] || '',
          location: game[6] || '',
          date: game[7] || '',
          note: game.length > 8 ? game[8] : '',
          gameImg: game.length > 9 ? game[9] : '',
          opponentImg: game.length > 10 ? game[10] : '',
          maxPreps: game.length > 11 ? game[11] : '',
          tickets: game.length > 12 ? game[12] : ''
        };
        
       // console.log('Created gameData object:', gameData);
        this._allSeasonData.push(gameData);
      } else {
        console.warn('Skipping invalid game data row:', game);
      }
    }
    
    // Filter for current season if year is provided
    if (year) {
      console.log(`Filtering for year: ${year}`);
      this._currentSeasonData = this._allSeasonData.filter(
        (season: GameData) => season.year === year
      );
    } else {
      this._currentSeasonData = [...this._allSeasonData];
    }
    
    //console.log(`Final _currentSeasonData (${this._currentSeasonData.length} items):`, this._currentSeasonData);
  }

  /**
   * Build analytics from game data
   * 
   * @param data - Game data to analyze
   */
  buildAnalytics(data: GameData[]): void {
    // Implement analytics functionality
    // For example: win/loss record, average points, etc.
  }

  /**
   * Process previous games against a specific opponent
   * 
   * @param opponent - Opponent name
   * @returns Array of previous games against opponent
   */
  processPrevious(opponent: string): GameData[] {
    if (!opponent || !this._allSeasonData.length) {
      return [];
    }
    
    const retData = this._allSeasonData.filter(
      (game: GameData) => game.opponent === opponent
    );
    
    // Build analytics for these games
    this.buildAnalytics(retData);
    
    return retData;
  }

  /**
   * Sanitize URL for safe navigation
   * 
   * @param url - URL to sanitize
   * @returns Sanitized URL string
   */
  sanitizeURL(url: string): string {
    if (!url) {
      return "";
    }
    
    const retVal = this.sanitizer.sanitize(SecurityContext.URL, url);
    return retVal || "";
  }

  /**
   * Navigate to external link in new tab
   * 
   * @param url - URL to navigate to
   */
  navigateToLink(url: string): void {
    if (url) {
      window.open(this.sanitizeURL(url), "_blank");
    }
  }

  /**
   * Load schedule data from API service
   *
   * @param level - Team level (varsity, jv, freshman)
   * @param season - Season year
   */
  loadData(level?: string, season?: string): void {
    // Unsubscribe from any existing subscription
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    
    // Set loading state
    this.isLoading = true;
    
    console.log(`Loading schedule for level: ${level}, season: ${season}`);
    
    const subscription = this.apiService.getScheduleResults(level, season).subscribe({
      next: (response) => {
        // Process the schedule data inside ngZone to ensure proper change detection
        this.ngZone.run(() => {
          console.log('Schedule API response:', response);
          if (response && response.values && response.values.length > 0) {
            this.processResults(response.values, season);
            console.log('Current season data after processing:', this._currentSeasonData);
          } else {
            console.warn('No valid schedule data found in response:', response);
            // Clear the data when no response is received
            this._allSeasonData = [];
            this._currentSeasonData = [];
          }
          this.isLoading = false;
        });
      },
      error: (error) => {
        // Handle errors inside ngZone to ensure proper change detection
        this.ngZone.run(() => {
          console.error('Error loading schedule data:', error);
          // Clear the data on error
          this._allSeasonData = [];
          this._currentSeasonData = [];
          this.isLoading = false;
        });
      }
    });
    
    this.subscriptions.push(subscription);
  }

  /**
   * Load JV schedule
   */
  loadJV(): void {
    this.activeTab = 'jv';
    this.loadData('jv', '2025');
  }

  /**
   * Load Freshman schedule
   */
  loadFrosh(): void {
    this.activeTab = 'frosh';
    this.loadData('frosh', '2025');
  }

  /**
   * Load Varsity schedule
   */
  loadVarsity(): void {
    this.activeTab = 'varsity';
    this.loadData('varsity', '2025');
  }
}
