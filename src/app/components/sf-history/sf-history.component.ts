import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import NavItems from "../../interfaces/navigation";

@Component({
  standalone: true,
  selector: 'app-sf-history',
  templateUrl: './sf-history.component.html',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./sf-history.component.scss']
})
export class SfHistoryComponent implements OnInit {
  constructor(private router: Router ) {
  }
  ngOnInit() {
    this.router.navigate(['history/results']);
  }

}
