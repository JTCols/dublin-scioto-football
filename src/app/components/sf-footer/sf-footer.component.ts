import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sf-footer',
  templateUrl: './sf-footer.component.html',
  styleUrls: ['./sf-footer.component.scss'],
  imports: [RouterModule]
})
export class SfFooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  
  ngOnInit(): void {
    // Component initialization
  }
}
