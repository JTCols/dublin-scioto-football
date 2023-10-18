import {Component, SecurityContext} from '@angular/core';
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


  _imageSrcPath: string = "/assets/sponsors/";


  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private apiService: SfApiService,
  ) {
  }

  ngOnInit() {

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
        title: sponsor[1],
        alt: sponsor[1],
        contact: sponsor[2],
        link: sponsor[3],
        thumbImage: this._imageSrcPath + sponsor[4],
        image: sponsor[4]
      };
      this._sponsorData.push(retData);
    }
  }

  public imageClick(slidePosition: number) {
    // @ts-ignore
    this.showMore(this._sponsorData[slidePosition].link)
  }

  private checkDateRange(startDate: Number, endDate: Number, currDate: Number) {
    return startDate <= currDate && endDate >= currDate;
  }

  showMore(url: string) {
    if (url) window.open(this.sanitizeURL(url), "_blank");
  }

  sanitizeURL(url: string) {
    let retVal = this.sanitizer.sanitize(SecurityContext.URL, url);
    return retVal || "";
  }

  private processAnnouncementData(announcementRawData: string[]): void {
    for (let announcementItem of announcementRawData) {
      let retData: any = {
        headline: announcementItem[0],
        body: announcementItem[1],
        startDate: Date.parse(announcementItem[2]),
        endDate: Date.parse(announcementItem[3]),
        url: announcementItem[4]
      };

      if (this.checkDateRange(retData.startDate, retData.endDate, new Date().getTime())) {
        this._announcementData.push(retData);
      }

    }
  }

  navigateToLink(url: string){
    if (url) window.open(this.sanitizeURL(url), "_blank");
  }

}


// https://www.instagram.com/dshsirishfootball/?utm_source=ig_embed&amp;utm_campaign=loading
