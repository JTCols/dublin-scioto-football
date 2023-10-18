import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SfHomePageComponent} from "./components/sf-home-page/sf-home-page.component";
import {SfCoachingStaffComponent} from "./components/sf-coaching-staff/sf-coaching-staff.component";
import {SfRosterComponent} from "./components/sf-roster/sf-roster.component";
import {SfScheduleComponent} from "./components/sf-schedule/sf-schedule.component";
import {SfStandingsComponent} from "./components/sf-standings/sf-standings.component";
import {SfStatisticsComponent} from "./components/sf-statistics/sf-statistics.component";
import {SfAlumniComponent} from "./components/sf-alumni/sf-alumni.component";
import {SfStoriedRivalsComponent} from "./components/sf-storied-rivals/sf-storied-rivals.component";
import {SfCalendarComponent} from "./components/sf-calendar/sf-calendar.component";
import {SfIrishNflComponent} from "./components/sf-irish-nfl/sf-irish-nfl.component";
import {SfRecordsComponent} from "./components/sf-records/sf-records.component";
import {SfStadiumComponent} from "./components/sf-stadium/sf-stadium.component";
import {SfLinksComponent} from "./components/sf-links/sf-links.component";
import {SfHistoryComponent} from "./components/sf-history/sf-history.component";
import {SfContactsComponent} from "./components/sf-contacts/sf-contacts.component";
import {SfTouchdownClubComponent} from "./components/sf-touchdown-club/sf-touchdown-club.component";
import {SfResultsComponent} from "./components/sf-results/sf-results.component";

const routes: Routes = [
  {
    path: "",
    component: SfHomePageComponent
  },
  {
    path: "home",
    component: SfHomePageComponent
  },
  {
    path: "coaches",
    component: SfCoachingStaffComponent
  },
  {
    path: "calendar",
    component: SfCalendarComponent
  },
  {
    path: "roster",
    component: SfRosterComponent
  },
  {
    path: "schedule",
    component: SfScheduleComponent
  },
  {
    path: "standings",
    component: SfStandingsComponent
  },
  {
    path: "storied-rivals",
    component: SfStoriedRivalsComponent
  },
  {
    path: "history",
    component: SfHistoryComponent,
    children: [
      {
        path: "alumni",
        component: SfAlumniComponent
      },
      {
        path: "irish-nfl",
        component: SfIrishNflComponent
      },
      {
        path: "records-awards",
        component: SfRecordsComponent
      },
      {
        path: "stats",
        component: SfStatisticsComponent
      },
      {
        path: "results",
        component: SfResultsComponent
      }
    ]
  },
  {
    path: "stadium",
    component: SfStadiumComponent
  },
  {
    path: "links",
    component: SfLinksComponent
  },
  {
    path: "contact",
    component: SfContactsComponent
  },
  {
    path: "td-club",
    component: SfTouchdownClubComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
