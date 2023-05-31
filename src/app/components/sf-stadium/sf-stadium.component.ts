import {Component} from '@angular/core';

@Component({
  selector: 'app-sf-stadium',
  templateUrl: './sf-stadium.component.html',
  styleUrls: [
    './sf-stadium.component.scss'
  ]
})
export class SfStadiumComponent {

  imageObject: Array<object> = [
    {
      image: 'assets/stadium/DS-football-stad.jpg',
      thumbImage: '/assets/stadium/DS-football-stad.jpg',
      alt: 'Dublin Scioto Football Stadium',
      title: 'Dublin Scioto Football Stadium'
    },
    {
      image: 'assets/stadium/stadium-field-wa-full.jpg',
      thumbImage: '/assets/stadium/stadium-field-wa.jpg',
      alt: 'Dublin Scioto Football Stadium',
      title: 'Dublin Scioto Football Stadium'
    },
    {
      image: 'assets/stadium/stadium-home-stands-full.jpg',
      thumbImage: '/assets/stadium/stadium-home-stands.jpg',
      alt: 'Home Stands',
      title: 'Home Stands'
    },
    {
      image: 'assets/stadium/stadium-field-wa-full.jpg',
      thumbImage: '/assets/stadium/stadium-field-wa.jpg',
      alt: 'Stadium Field - Full',
      title: 'Stadium Field - Full'
    },
    {
      image: 'assets/stadium/stadium-scoreboard-full.jpg',
      thumbImage: '/assets/stadium/stadium-scoreboard.jpg',
      alt: 'Scoreboard',
      title: 'Scoreboard'
    },
    {
      image: 'assets/stadium/stadium-visitors-stands-full.jpg',
      thumbImage: '/assets/stadium/stadium-visitor-stands.jpg',
      alt: 'Visitor Stands',
      title: 'Visitor Stands'
    },

    {
      image: 'assets/stadium/stadium-north-endzone-full.jpg',
      thumbImage: '/assets/stadium/stadium-north-endzone.jpg',
      alt: 'North Endzone',
      title: 'North Endzone'
    },

    {
      image: 'assets/stadium/stadium-press-box-full.jpg',
      thumbImage: '/assets/stadium/stadium-press-box.jpg',
      alt: 'Press Box',
      title: 'Press Box'
    }
  ];



  constructor() {
  }

  ngOnInit(): void {
  }


}
