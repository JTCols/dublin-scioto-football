import {Component, SecurityContext} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {Observable} from "rxjs";
import NavItems from "../../interfaces/navigation";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-sf-navigation',
  templateUrl: './sf-navigation.component.html',
  styleUrls: ['./sf-navigation.component.scss']
})
export class SfNavigationComponent {
  _navData: NavItems = {
    "navData": [
      {
        "title": "Home",
        "route": "home",
        "icon": "home"
      },
      {
        "title": "Calendar",
        "route": "calendar",
        "icon": "calendar_month"
      },
      {
        "title": "Schedule",
        "route": "schedule",
        "icon": "sports_football"
      },
      {
        "title": "Roster",
        "route": "roster",
        "icon": "group"
      },
      {
        "title": "Coaching Staff",
        "route": "coaches",
        "icon": "sports"
      },
      {
        "title": "Storied Rivals",
        "route": "storied-rivals",
        "icon": "video_camera_front"
      },
      {
        "title": "History",
        "route": "history",
        "icon": "manage_search"
      },
      {
        "title": "Stadium",
        "route": "stadium",
        "icon": "stadium"
      },
      {
        "title": "Links",
        "route": "links",
        "icon": "link"
      }
    ]
  };

  _showNav: boolean = false;

  constructor(private apiService: SfApiService, private router: Router, private sanitizer: DomSanitizer) {
    // apiService.getNavigation().subscribe(
    //   (resp: NavItems) => this._navData = resp,
    //   (err: Error) => console.error('API service failure: ' + err),
    //   () => console.log('Observer got a complete notification')
    // );
  }

  loadPageComponent(route?: string) {
    this.router.navigate([route, {}]);
  }


  navigateLink(url: string){
    if (url) window.open(this.sanitizeURL(url), "_blank");
  }

  sanitizeURL(url: string) {
    let retVal = this.sanitizer.sanitize(SecurityContext.URL, url);
    return retVal || "";
  }

  toggleMobileNav(evt: Event){
    this._showNav = !this._showNav;
  }
}
