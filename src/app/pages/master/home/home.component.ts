import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CockpitService } from './../../../services/cockpit.service';

declare var $: any;
@Component({
  selector: 'app-master-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // totalTemplates: number = 6;
  // totalGames: number = 20;
  // activeGames: number = 12;
  isTimesUp: boolean = false;
  progressWidth: number = 66;
  totalTemplates: number;
  totalGames: number;
  totalTemplatestData: any;
  totalGamesData: any;
  completedGames: any
  totalCompletedGamesData: any;
  totalActiveGamesData: any;
  activeGames: any;


  constructor(private cockpitService: CockpitService, private router: Router) {
    this.getTemplates();
    this.getTotalGames();
    this.getActiveGames();
    this.getCompletedGames();
  }

  ngOnInit(): void {

  }

  getTemplates() {
      this.cockpitService.getTemplates().subscribe((response: any) => {
        // console.log("response getTemplates", response);
        this.totalTemplatestData= response;
        this.totalTemplates = this.totalTemplatestData.data.scmTmplt.length
      })
  }

  getTotalGames() {
    this.cockpitService.getGames().subscribe((response: any) => {
      this.totalGamesData = response;
      // console.log(response.data)
      this.totalGames = this.totalGamesData.data.scmGameSetup.length
    })
  }

  getCompletedGames() {
    this.cockpitService.getCompleted().subscribe((response: any) => {
      this.totalCompletedGamesData = response;
      // console.log(response.data)
      this.completedGames = this.totalCompletedGamesData.data.scmGameSetup.length
      // console.log(this.completedGames)
    })
  }

  getActiveGames() {
    this.cockpitService.getActive().subscribe((response: any) => {
      this.totalActiveGamesData = response;
      console.log(response.data )
      this.activeGames = this.totalActiveGamesData.data.scmGameSetup.length
      console.log(this.activeGames)
    })
  }

  // getActiveGames() {
  //   this.cockpitService.getActiveGames().subscribe((response: any) => {
  //     console.log("response getActiveGames", response);
  //     this.activeGames = response[0]["count(*)"];
  //   })
  // }

  onStartGame() {
    this.router.navigate(['/app/master/dashboard']);
  }
}
