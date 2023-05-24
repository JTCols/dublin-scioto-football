import {AfterViewInit, Component} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";

@Component({
  selector: 'app-sf-storied-rivals',
  templateUrl: './sf-storied-rivals.component.html',
  styleUrls: ['./sf-storied-rivals.component.scss']
})
export class SfStoriedRivalsComponent implements AfterViewInit{
  storiedRivalsJSON: any[] = [];
  constructor(private apiService: SfApiService) {
  }

  ngAfterViewInit(){
    this.apiService.getStoriedRivals().subscribe(response => {
      if (response.items && response.items.length > 1) {
        this.storiedRivalsJSON = response.items;
      }
    });
  }

  openYouTube(videoId: string){
    window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
  }


}
