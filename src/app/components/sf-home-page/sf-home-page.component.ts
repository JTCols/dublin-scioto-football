import {Component} from '@angular/core';
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

  imageObject: Array<object> = [
    {
      image: '/assets/sponsors/XL-logo-orange-white-100.png',
      thumbImage: '/assets/sponsors/XL-logo-orange-white-100.png',
      alt: 'Xtreme Limo',
      title: 'Xtreme Limo'
    },
    {
      image: '/assets/sponsors/sue-berg.jpg',
      thumbImage: '/assets/sponsors/sue-berg.jpg',
      alt: 'Sue Berg',
      title: 'Sue Berg'
    },
    {
      image: '/assets/sponsors/danielle-remax.png',
      thumbImage: '/assets/sponsors/danielle-remax.png',
      alt: 'Danielle:  Remax',
      title: 'Danielle:  Remax'
    },
    {
      image: '/assets/sponsors/kw-classic.jpg',
      thumbImage: '/assets/sponsors/kw-classic.jpg',
      alt: 'Lindsey:  kwClassic',
      title: 'Lindsey:  kwClassic'
    },
    {
      image: '/assets/sponsors/mannys-landscaping.jpg',
      thumbImage: '/assets/sponsors/mannys-landscaping.jpg',
      alt: "Manny\'s Landscaping",
      title: 'Manny\'s Landscaping'
    },
    {
      image: '/assets/sponsors/mulligans-logo.jpg',
      thumbImage: '/assets/sponsors/mulligans-logo.jpg',
      alt: "Mulligans\'s Sportspub",
      title: 'Mulligans\'s Sportspub'
    },
    {
      image: '/assets/sponsors/dublin-dental.png',
      thumbImage: '/assets/sponsors/dublin-dental.png',
      alt: "Dublin Dental",
      title: 'Dublin Dental'
    },
    {
      image: '/assets/sponsors/hawthorn-logo.png',
      thumbImage: '/assets/sponsors/hawthorn-logo.png',
      alt: "Hawthorn Academy",
      title: 'Hawthorn Academy'
    },
    {
      image: '/assets/sponsors/orlandis-cleaning.jpg',
      thumbImage: '/assets/sponsors/orlandis-cleaning.jpg',
      alt: "Orlandis Cleaning",
      title: 'Orlandis\'s Cleaning'
    }
  ];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private apiService: SfApiService,
  ) {
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

  public imageClick(slidePosition: number) {


    // @ts-ignore
    window.alert(this.imageObject[slidePosition].title);


    //window.open("https://www.google.com");
  }


  private checkDateRange(startDate: Number, endDate: Number, currDate: Number) {
    return startDate <= currDate && endDate >= currDate;
  }


  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  private processAnnouncementData(announcementRawData: string[]): void {
    for (let announcementItem of announcementRawData) {
      let retData: any = {
        headline: announcementItem[0],
        body: announcementItem[1],
        startDate: Date.parse(announcementItem[2]),
        endDate: Date.parse(announcementItem[3]),
        url: this.sanitizer.bypassSecurityTrustUrl(announcementItem[4])
      };

      if (this.checkDateRange(retData.startDate, retData.endDate, new Date().getTime())) {
        this._announcementData.push(retData);
      }

    }
  }


}


// https://www.instagram.com/dshsirishfootball/?utm_source=ig_embed&amp;utm_campaign=loading
