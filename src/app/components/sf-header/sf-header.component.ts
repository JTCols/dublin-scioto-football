import {Component, EventEmitter, Output} from '@angular/core';
import {SfNavigationOverlayComponent} from "../sf-navigation-overlay/sf-navigation-overlay.component";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-sf-header',
  templateUrl: './sf-header.component.html',
  imports: [
    SfNavigationOverlayComponent,
    MatIcon,
    NgClass
  ],
  styleUrls: ['./sf-header.component.scss']
})
export class SfHeaderComponent {


  _showNavOverlay: boolean = false;




  toggleNavOverlay(){
    this._showNavOverlay = ! this._showNavOverlay;
  }
}
