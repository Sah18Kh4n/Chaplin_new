import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input('ratings') ratings: number = 0;
  stars: number[] = [];
  constructor() {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.stars = this.range(this.ratings);
  }
  selectedValue: number = 0;

  countStar(star) {
    this.selectedValue = star;
  }

  addClass(star) {
    let ab = '';
    for (let i = 0; i < star; i++) {
      ab = 'starId' + i;
      document.getElementById(ab).classList.add('selected');
    }
  }
  removeClass(star) {
    let ab = '';
    for (let i = star - 1; i >= this.selectedValue; i--) {
      ab = 'starId' + i;
      document.getElementById(ab).classList.remove('selected');
    }
  }

  range(end) {
    var foo = [];
    for (var i = 1; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }
}
