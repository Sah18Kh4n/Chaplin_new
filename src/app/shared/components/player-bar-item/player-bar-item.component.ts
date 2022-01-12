import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-bar-item',
  templateUrl: './player-bar-item.component.html',
  styleUrls: ['./player-bar-item.component.css']
})
export class PlayerBarItemComponent implements OnInit {
  @Input("label") label: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
