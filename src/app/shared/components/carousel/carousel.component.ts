import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef;
  @Input('slides-to-show') slidesToShow: number = 3;
  @Input('slides-to-scroll') slidesToScroll: number = 1;
  @Input('is-infinite') isInfinite: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const carouselEl = $(this.carousel.nativeElement);
    carouselEl.slick({
      infinite: this.isInfinite,
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
      arrows: false,
    });
  }

  onPrevClick() {
    $(this.carousel.nativeElement).slick('slickPrev');
  }

  onNextClick() {
    $(this.carousel.nativeElement).slick('slickNext');
  }
}
