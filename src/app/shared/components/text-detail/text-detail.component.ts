import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.component.html',
  styleUrls: ['./text-detail.component.css']
})
export class TextDetailComponent implements OnInit {
  @Input('label') label: string;
  @Input('data') data: string;
  constructor() { }

  ngOnInit(): void {
  }

}
