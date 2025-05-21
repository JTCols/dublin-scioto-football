import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sf-records',
  templateUrl: './sf-records.component.html',
  styleUrls: ['./sf-records.component.scss'],
  imports: [CommonModule]
})
export class SfRecordsComponent {
  @ViewChild('recordsFrame') recordsFrame!: ElementRef;
  isLoading = true;

  onIframeLoad(): void {
    this.isLoading = false;
  }
}
