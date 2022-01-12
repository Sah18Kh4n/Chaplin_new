import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  show: boolean = false;
  @Input("position") position: string = "center";

  constructor() {}

  ngOnInit(): void {}

  toggleShow() {
    console.log('SHOW', this.show);
    this.show = !this.show;
  }
}
