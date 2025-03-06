import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import NavItems from "../../interfaces/navigation";
import Alumni from "../../interfaces/alumni";
import StoriedRivalsList from "../../interfaces/storied-rivals";

@Injectable({
  providedIn: 'root'
})
export class SfApiService {


  /**
   *  @todo  fix this
   * @private
   */
  private apiKey: string = "AIzaSyBFW_smGUpJkPdvw-UezA4-7hOCKaSIliY";
  private apiLink: string = "https://sheets.googleapis.com/v4/spreadsheets/1Nh_kzHO31XICIDC1Vza24uEc72m17us95kIMZMxM-E4/values/";

  constructor(private httpClient: HttpClient) {
  }

  public getNavigation(): Observable<NavItems> {
    return this.httpClient.get<NavItems>(
      `https://www.sciotofootball.com/services/navigation-service.php`
    );
  }

  public getGameResults( level?: string, season?: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://www.sciotofootball.com/services/sf-results-service.php?level=` + level + `&season=` + season
    );
  }

  public getScheduleResults( level?: string, season?: string): Observable<any> {
    return this.httpClient.get<any>(
      this.apiLink + level +`-schedule?alt=json&key=` + this.apiKey
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
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLyDRwqo3Ex2D-3BNvmWZcZ2E-HFCKWipE&key=` + this.apiKey
    );
  }


}
