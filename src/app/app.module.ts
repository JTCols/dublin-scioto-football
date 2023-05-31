import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SfHeaderComponent} from './components/sf-header/sf-header.component';
import {SfFooterComponent} from './components/sf-footer/sf-footer.component';
import {SfNavigationComponent} from './components/sf-navigation/sf-navigation.component';
import {SfHomePageComponent} from './components/sf-home-page/sf-home-page.component';
import {HttpClientModule} from "@angular/common/http";
import {SfScheduleComponent} from './components/sf-schedule/sf-schedule.component';
import {SfRosterComponent} from './components/sf-roster/sf-roster.component';
import {SfCoachingStaffComponent} from './components/sf-coaching-staff/sf-coaching-staff.component';
import {SfCalendarComponent} from './components/sf-calendar/sf-calendar.component';
import {SfStandingsComponent} from './components/sf-standings/sf-standings.component';
import {SfStatisticsComponent} from './components/sf-statistics/sf-statistics.component';
import {SfStoriedRivalsComponent} from './components/sf-storied-rivals/sf-storied-rivals.component';
import {SfAlumniComponent} from './components/sf-alumni/sf-alumni.component';
import {SfIrishNflComponent} from './components/sf-irish-nfl/sf-irish-nfl.component';
import {SfHistoryComponent} from './components/sf-history/sf-history.component';
import {SfRecordsComponent} from './components/sf-records/sf-records.component';
import {SfStadiumComponent} from './components/sf-stadium/sf-stadium.component';
import {SfLinksComponent} from './components/sf-links/sf-links.component';
import {SfContactsComponent} from './components/sf-contacts/sf-contacts.component';
import {SfTouchdownClubComponent} from './components/sf-touchdown-club/sf-touchdown-club.component';
import {AgGridModule} from "ag-grid-angular";
import {NgxTwitterTimelineModule} from "ngx-twitter-timeline";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {SfResultsComponent} from './components/sf-results/sf-results.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgImageSliderModule} from "ng-image-slider";

@NgModule({
  declarations: [
    AppComponent,
    SfHeaderComponent,
    SfFooterComponent,
    SfNavigationComponent,
    SfHomePageComponent,
    SfScheduleComponent,
    SfRosterComponent,
    SfCoachingStaffComponent,
    SfCalendarComponent,
    SfStandingsComponent,
    SfStatisticsComponent,
    SfStoriedRivalsComponent,
    SfAlumniComponent,
    SfIrishNflComponent,
    SfHistoryComponent,
    SfRecordsComponent,
    SfStadiumComponent,
    SfLinksComponent,
    SfContactsComponent,
    SfTouchdownClubComponent,
    SfResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    NgxTwitterTimelineModule,
    SlickCarouselModule,
    MatButtonModule,
    MatIconModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
