import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sf-irish-nfl',
  templateUrl: './sf-irish-nfl.component.html',
  styleUrls: ['./sf-irish-nfl.component.scss'],
  imports: [
    NgIf,
    NgClass
  ]
})
export class SfIrishNflComponent {
  title = 'Dublin Scioto Irish in the NFL';
}
