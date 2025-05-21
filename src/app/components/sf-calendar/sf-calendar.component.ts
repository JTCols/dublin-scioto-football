import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-sf-calendar',
  templateUrl: './sf-calendar.component.html',
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./sf-calendar.component.scss']
})
export class SfCalendarComponent implements OnInit {
  loading = true;

  ngOnInit() {
    // Simulate a small delay to show loading state
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  
  onCalendarLoad() {
    this.loading = false;
  }
}
