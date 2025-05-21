import {AfterViewInit, Component} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-sf-storied-rivals',
  templateUrl: './sf-storied-rivals.component.html',
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./sf-storied-rivals.component.scss']
})
export class SfStoriedRivalsComponent implements AfterViewInit {
  storiedRivalsJSON: any[] = [];
  loading = true;
  
  constructor(private apiService: SfApiService) {
  }

  ngAfterViewInit() {
    this.loading = true;
    this.apiService.getStoriedRivals().subscribe(response => {
      if (response.items && response.items.length > 0) {
        this.storiedRivalsJSON = response.items;
      }
      this.loading = false;
    }, error => {
      console.error('Error loading storied rivals data:', error);
      this.loading = false;
    });
  }

  openYouTube(videoId: string) {
    window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
  }
}
