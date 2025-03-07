import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SfFooterComponent} from "./components/sf-footer/sf-footer.component";
import {RouterOutlet} from "@angular/router";
import {SfHeaderComponent} from "./components/sf-header/sf-header.component";
import {SfNavigationComponent} from "./components/sf-navigation/sf-navigation.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    SfFooterComponent,
    RouterOutlet,
    SfHeaderComponent,
    SfNavigationComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private titleService: Title) {
    titleService.setTitle("Dublin Scioto Football");
  }
}
