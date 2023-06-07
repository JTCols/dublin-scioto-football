import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sf-header',
  templateUrl: './sf-header.component.html',
  styleUrls: ['./sf-header.component.scss']
})
export class SfHeaderComponent {


  _showNavOverlay: boolean = false;




  toggleNavOverlay(){
    this._showNavOverlay = ! this._showNavOverlay;
  }
}
