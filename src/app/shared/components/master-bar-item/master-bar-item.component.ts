import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-bar-item',
  templateUrl: './master-bar-item.component.html',
  styleUrls: ['./master-bar-item.component.css'],
})
export class MasterBarItemComponent implements OnInit {
  @Input("count") count: number = 0;
  @Input("label") label: string = "";
  constructor() {}

  ngOnInit(): void {}

  getFormattedNumber(num: number): string[] {
    const numb = this.convertToTwoDigit(num);

    return numb.split('');
  }

  private convertToTwoDigit(num: number): string {
    return num <= 9 ? `0${num}` : `${num}`;
  }
}
