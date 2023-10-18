import {Component, EventEmitter, Output, SecurityContext} from '@angular/core';
import NavItems from "../../interfaces/navigation";
import {SfApiService} from "../../services/api/sf-api.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-sf-navigation-overlay',
  templateUrl: './sf-navigation-overlay.component.html',
  styleUrls: ['./sf-navigation-overlay.component.scss']
})
export class SfNavigationOverlayComponent {
  @Output() toggleNav: EventEmitter<string> = new EventEmitter<string>();

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

  constructor(private router: Router, private sanitizer: DomSanitizer) {
  }

  loadPageComponent(route?: string) {
    this.router.navigate([route, {}]);
    this.toggleNavOverlay();
  }

  toggleNavOverlay() {
    this.toggleNav.emit('toggleNav');
  }
  sanitizeURL(url: string) {
    let retVal = this.sanitizer.sanitize(SecurityContext.URL, url);
    return retVal || "";
  }
  navigateToLink(url: string){
    if (url) window.open(this.sanitizeURL(url), "_blank");
  }
}
