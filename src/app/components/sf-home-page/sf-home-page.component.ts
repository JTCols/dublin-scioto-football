import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SfApiService} from "../../services/api/sf-api.service";

@Component({
  selector: 'app-sf-home-page',
  templateUrl: './sf-home-page.component.html',
  styleUrls: ['./sf-home-page.component.scss']
})
export class SfHomePageComponent {
  result: SafeHtml = "";

  _announcementData: any = [];

  _sponsorData: any = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private apiService: SfApiService
  ){
  }

  ngOnInit() {
    // this.http.get<any>('https://www.instagram.com/dshsirishfootball/?utm_source=ig_embed&amp;utm_campaign=loading')
    //   .subscribe(value => {
    //     console.log('response', value);
    //     this.result = this.sanitizer.bypassSecurityTrustHtml(value.html);
    //   })

    this.apiService.getAnnouncements().subscribe(response => {
      if (response.values && response.values.length > 1) {
        this.processAnnouncementData(response.values)
      }
    });

    this.apiService.getSponsors().subscribe(response => {
      if (response.values && response.values.length > 1) {
        this.processSponsorData(response.values)
      }
    });

  }

  private processSponsorData(sponsorRawData: string[]): void {
    for (let sponsor of sponsorRawData) {
      let retData: any = {
        id: sponsor[0],
        name: sponsor[1],
        contact: sponsor[2],
        link: sponsor[3],
        imgSrc: sponsor[4],
      };
      this._sponsorData.push(retData);
    }
  }

  private processAnnouncementData(announcementRawData: string[]): void {
    for (let announcementItem of announcementRawData) {
      let retData: any = {
        headline: announcementItem[0],
        body: announcementItem[1],
        startDate: announcementItem[2],
        endDate: announcementItem[3],
      };
      this._announcementData.push(retData);
    }
  }


}


// https://www.instagram.com/dshsirishfootball/?utm_source=ig_embed&amp;utm_campaign=loading
