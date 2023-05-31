import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sf-header',
  templateUrl: './sf-header.component.html',
  styleUrls: ['./sf-header.component.scss']
})
export class SfHeaderComponent {
  @Output() emitter:EventEmitter<string> = new EventEmitter<string>();


  emit(){
    this.emitter.emit('toggleNav');
  }
}
