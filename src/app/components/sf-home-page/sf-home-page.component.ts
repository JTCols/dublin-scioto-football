import {Component, SecurityContext, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SfApiService} from "../../services/api/sf-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgImageSliderModule} from "ng-image-slider";
import {ImgFallbackDirective} from '../../directives/img-fallback.directive';

declare global {
  interface Window {
    instgrm?: any;
  }
}

@Component({
  standalone: true,
  selector: 'app-sf-home-page',
  templateUrl: './sf-home-page.component.html',
  imports: [
    NgForOf,
    NgIf,
    NgImageSliderModule,
    ImgFallbackDirective
  ],
  styleUrls: ['./sf-home-page.component.scss']
})
export class SfHomePageComponent implements AfterViewInit, OnInit, OnDestroy {
  result: SafeHtml = "";

  _announcementData: any = [];

  _sponsorData: any = [];

  // Path to sponsor images
  _originalImagePath: string = "/assets/sponsors/";

  private instagramScriptElement: HTMLScriptElement | null = null;

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

  ngAfterViewInit() {
    // Process Instagram embeds after view init
    this.processInstagramEmbeds();
  }
  
  ngOnDestroy() {
    // Clean up the script element if it exists
    if (this.instagramScriptElement) {
      document.body.removeChild(this.instagramScriptElement);
    }
  }

  // Manually process Instagram embeds
  private processInstagramEmbeds(): void {
    // Load the Instagram script
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      this.instagramScriptElement = script;
      
      // Process embeds once the script is loaded
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    } else if (window.instgrm) {
      // If script already exists, just process embeds
      window.instgrm.Embeds.process();
    }
  }

  private processSponsorData(sponsorRawData: string[]): void {
    for (let sponsor of sponsorRawData) {
      let imageName = sponsor[4];
      
      // Create sponsor object with explicit dimensions to avoid NG0913 warning
      let retData: any = {
        id: sponsor[0],
        title: sponsor[1],
        alt: sponsor[1],
        contact: sponsor[2],
        link: sponsor[3],
        thumbImage: this._originalImagePath + imageName,
        image: imageName,
        width: 190, // Explicit width matching slider configuration
        height: 100, // Explicit height for aspect ratio
        posterLoading: true // Use poster loading for better performance
      };
      this._sponsorData.push(retData);
    }
  }

  public imageClick(slidePosition: number) {
    if (slidePosition >= 0 && slidePosition < this._sponsorData.length) {
      this.showMore(this._sponsorData[slidePosition].link);
    }
  }

  private checkDateRange(startDate: number, endDate: number, currDate: number) {
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
