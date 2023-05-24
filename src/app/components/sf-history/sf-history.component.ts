import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SfApiService} from "../../services/api/sf-api.service";
import {Router} from "@angular/router";
import NavItems from "../../interfaces/navigation";

@Component({
  selector: 'app-sf-history',
  templateUrl: './sf-history.component.html',
  styleUrls: ['./sf-history.component.scss']
})
export class SfHistoryComponent implements OnInit {
  constructor(private router: Router ) {
  }
  ngOnInit() {
    this.router.navigate(['history/results']);
  }

}
