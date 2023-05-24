import {Component} from '@angular/core';

@Component({
  selector: 'app-sf-stadium',
  templateUrl: './sf-stadium.component.html',
  styleUrls: [
    './sf-stadium.component.scss'
  ]
})
export class SfStadiumComponent {

  slides = [
    {img:
        "/assets/stadium/DS-football-stad.jpg",
      caption:"This is a test"
    },
    {img: '/assets/stadium/stadium-field-wa-full.jpg'},
    {img: '/assets/stadium/stadium-home-stands-full.jpg'},
    {img: '/assets/stadium/stadium-north-endzone-full.jpg'},
    {img: '/assets/stadium/stadium-press-box-full.jpg'},
    {img: '/assets/stadium/stadium-scoreboard-full.jpg'},
    {img: '/assets/stadium/stadium-south-endzone-full.jpg'},
    {img: '/assets/stadium/stadium-visitor-press-box-full.jpg'},
    {img: '/assets/stadium/stadium-visitors-stands-full.jpg'},
  ];


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    variableWidth: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    pauseOnFocus: true,

    centerMode: true,
    //focusOnSelect: true,
  };

  slideNavConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    pauseOnDotsHover: true,
    centerMode: true,
    focusOnSelect: true
  };


  addSlide() {
    this.slides.push({img: 'http://placehold.it/350x150/777777'});
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor() {
  }

  ngOnInit(): void {
  }


}
