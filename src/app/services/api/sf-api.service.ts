import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Observable, catchError, map, throwError, of} from "rxjs";
import NavItems from "../../interfaces/navigation";
import Alumni from "../../interfaces/alumni";
import StoriedRivalsList from "../../interfaces/storied-rivals";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SfApiService {
  // Using environment variables for API keys and URLs
  private apiKey: string = environment.googleSheetsApiKey;
  private apiLink: string = environment.sheetsBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getNavigation(): Observable<NavItems> {
    // Use the proxy instead of direct API call to avoid CORS issues
    return this.httpClient.get<NavItems>(
      `/api/services/navigation-service.php`
    );
  }

  public getGameResults( level?: string, season?: string): Observable<any> {
    // Use the proxy instead of direct API call to avoid CORS issues
    return this.httpClient.get<any>(
      `/api/services/sf-results-service.php?level=${level}&season=${season}`
    );
  }

  public getScheduleResults(level?: string, season?: string): Observable<any> {
    const sheetName = level ? `${level}-schedule` : 'varsity-schedule'; // Default to varsity if no level specified
    console.log(`Requesting sheet: ${sheetName}`);
    
    // Create mock data for testing if needed
    const mockData = {
      values: [
        ["GameID", "SciotoScore", "OpponentScore", "Opponent", "Result", "Year", "Location", "Date", "Note", "GameImage", "MaxPreps", "Tickets"],
        ["1", "", "", "Watkins Memorial", "", "2024", "H", "2024-08-23", "Season Opener", "", "", "https://dublinschools.hometownticketing.com/embed/all"],
        ["2", "", "", "Westerville North", "", "2024", "A", "2024-08-30", "", "", "", ""],
        ["3", "", "", "Worthington Kilbourne", "", "2024", "H", "2024-09-06", "Homecoming", "", "", "https://dublinschools.hometownticketing.com/embed/all"]
      ]
    };
    
    return this.httpClient.get<any>(
      `${this.apiLink}${sheetName}?alt=json&key=${this.apiKey}`
    ).pipe(
      // Ensure consistent response format regardless of API structure
      map(response => {
        console.log('Raw Google Sheets API response:', response);
        
        // If response is empty or doesn't have the expected structure
        if (!response || !response.values || !Array.isArray(response.values) || response.values.length === 0) {
          console.warn('API response has no values array or empty array:', response);
          
          // For development: use mock data if real API doesn't return data
          if (environment.production === false) {
            console.log('Using mock data for development');
            return mockData;
          }
          
          // Create empty values array
          return { values: [] };
        }
        
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error fetching ${level} schedule:`, error.message);
        
        // For development: use mock data if API call fails
        if (environment.production === false) {
          console.log('Using mock data due to API error');
          return of(mockData); // Use of() to convert to Observable
        }
        
        if (error.status === 400) {
          return throwError(() => new Error(`The "${sheetName}" sheet doesn't exist or is inaccessible. Please verify the sheet name in the Google Sheets document.`));
        }
        return throwError(() => error);
      })
    );
  }

  public getAlumni(): Observable<Alumni> {
    return this.httpClient.get<any>(
      this.apiLink + `alumni?alt=json&key=` + this.apiKey
    );
  }

  public getAnnouncements(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiLink + `announcements?alt=json&key=` + this.apiKey
    );
  }

  public getRoster(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiLink + `roster?alt=json&key=` + this.apiKey
    );
  }

  public getLinks(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiLink + `links?alt=json&key=` + this.apiKey
    );
  }

  public getSponsors(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiLink + `sponsors?alt=json&key=` + this.apiKey
    );
  }

  public getStoriedRivals(): Observable<any> {
    return this.httpClient.get<StoriedRivalsList>(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLyDRwqo3Ex2D-3BNvmWZcZ2E-HFCKWipE&key=${environment.youtubeApiKey}`
    );
  }
}
