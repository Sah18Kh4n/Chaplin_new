import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  round: number = 5;
  balance: string = "$4,500";
  time: number = 20;
  demand: string = "122/400";
  isTimesUp: boolean = false;

  progressWidth: number = 66;

  constructor( private router: Router) {}

  ngOnInit(): void {}

  onStartGame() {
    this.router.navigate(['/app/player/supply-chain-network']);
  }
}
