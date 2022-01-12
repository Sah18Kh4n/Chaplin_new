import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

import { CockpitService } from './../../../services/cockpit.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';


// config = {
//   firstDayOfWeek: 'su',
//   monthFormat: 'MMM, YYYY',
//   disableKeypress: false,
//   allowMultiSelect: false,
//   closeOnSelect: undefined,
//   closeOnSelectDelay: 100,
//   onOpenDelay: 0,
//   weekDayFormat: 'ddd',
//   appendTo: document.body,
//   drops: 'down',
//   opens: 'right',
//   showNearMonthDays: true,
//   showWeekNumbers: false,
//   enableMonthSelector: true,
//   format: "YYYY-MM-DD HH:mm",
//   yearFormat: 'YYYY',
//   showGoToCurrent: true,
//   dayBtnFormat: 'DD',
//   monthBtnFormat: 'MMM',
//   hours12Format: 'hh',
//   hours24Format: 'HH',
//   meridiemFormat: 'A',
//   minutesFormat: 'mm',
//   minutesInterval: 1,
//   secondsFormat: 'ss',
//   secondsInterval: 1,
//   showSeconds: false,
//   showTwentyFourHours: true,
//   timeSeparator: ':',
//   multipleYearsNavigateBy: 10,
//   showMultipleYearsNavigation: false,
//   locale: 'zh-cn',
//   // min:'2017-08-29 15:50',
//   // minTime:'2017-08-29 15:50'
// };

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  game: any;
  games: any[];
  // GameForm: FormGroup[] = [];
  final: any;
  // form: FormGroup;
  fileToUpload: File | null = null;
  games1: any;
  id: number;
  show: boolean = false;
  selectedItem: number = 1;
  progressWidth: number = 66;
  gameForm: FormGroup;
  scm_game_id: number;
  sourceNames = { 0: 'schedule', 1: 'active', 2: 'completed', 3: 'cancelled' };
  datePickerConfig = {
    format: 'DD-MM-YYYY',
    monthFormat: 'MMM, YYYY',
    startDate: '01.01.2012',
  };
  timePickerConfig = {
    format: 'hh:mm a',
    showTwentyFourHours: false,
    timeSeparator: ':',
  };
  status: string;
  totalgames: any[] = [];
  game11: any;

  renderer: any;
  users: Game[];
  imageDisplay: string | ArrayBuffer;

  get f() {
    return this.gameForm.controls;
  }

  svgs = [
    'SVG files__Alpha icon.svg',
    'SVG files__Beta icon .svg',
    'SVG files__Omega icon.svg',
    'SVG files__Sigma icon .svg',
  ];

  getSvg(index) {
    console.log(
      '(index > 3) ? (index % 4) : index',
      index,
      index > 3 ? 'abc' : index
    );
    return '/assets/svgs/' + this.svgs[index > 3 ? index % 4 : index];
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private cockpitService: CockpitService
  ) {
    // this.getGames1();
    this.getgamesetup()
    // this.getDeletePlayer(this.scm_game_id)
  }

  ngOnInit(): void {


    this.cockpitService.getAllUser().subscribe((data: Game[]) => {
      this.games = data;
      console.log(this.games)
    });


    // this.game = {
    //   gameId: 'Game 01',
    //   name: 'Aplha',
    //   industry: 'Grain Storage',
    //   status: 'in-progress',
    // };

    this.gameForm = this.fb.group({
      scmTemplate: ['', [Validators.required]],
      gameRounds: ['', [Validators.required]],
      gameRoundDuration: ['', [Validators.required]],
      players: ['', [Validators.required]],
      playersFile: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
    });

  }

  getgamesetup() {
    this.cockpitService.getGames().subscribe((response: any) => {
      this.games1 = response;
      this.totalgames = this.games1.data.scmGameSetup
      console.log(this.totalgames.length)
      // this.game = this.games1.data.scmGameSetup[0]
      // console.log(this.game)
      // this.game11 = this.games1.data.scmGameSetup[1]
      // console.log(this.games1.data)
    });
  }

  getDeletePlayer(scm_game_id: number) {
    this.cockpitService.getDeleteGame(scm_game_id).subscribe(data => {
      console.log(data + "data deleted successfully")
    });

  }

  // deleteGame(id: number){
  //   this.cockpitService.delete(id).subscribe(res => {
  //   this.games = this.games.filter(item => item.scm_game_id !== id);
  //   console.log('Post deleted successfully')
  //   })
  // }


  onItemClick(num: number) {
    this.selectedItem = num;
  }

  onShow() {
    this.show = true;
  }

  goToSupplyChain() {
    this.router.navigate(['/app/master/supply-chain-network']);
  }

  onActivateGame() {
    if (!this.gameForm.valid) {
      Object.keys(this.gameForm.controls).forEach((field) => { // {1}
        const control = this.gameForm.get(field); // {2}
        control.markAsTouched({ onlySelf: true }); // {3}
      });
      this.toastr.error('All Fields required');
      return;
    }
  }

  onCancel() {
    this.handleClose();
    this.gameForm.reset();
    this.gameForm.markAsPristine();
    this.gameForm.markAsUntouched();
  }

  // onSubmit() {
  //   console.log('VALS: ', this.gameForm.value);
  // }

  onFileChanged(event, file, fileTyoe) {
    const files = event.target.files;
    console.log(event.target.files)
    // this.f[type].setValue(files[0]?.name);
    // this.f[fileType].setValue(files[0]);
  }

  handleClose() {
    this.show = false;
  }

  onChange(event) {
    console.log(event);
  }
  onSubmit() {
    const payload = {
      scmTemplate: this.gameForm.controls['scmTemplate'].value,
      gameRounds: this.gameForm.controls['gameRounds']?.value,
      // players: this.f().get.controls['players']?.value,
      // players: this.gameForm.controls['players']?.value,
      playersFile: this.gameForm.controls['playersFile']?.value,
      gameRoundDuration: this.gameForm.controls['gameRoundDuration']?.value,
      startDate: this.gameForm.controls['startDate']?.value,
      startTime: this.gameForm.controls['startTime']?.value,
    };
    // this.final.push(payload);

    // console.log(this.final)

    this.cockpitService.postUser(payload).subscribe((res) => {

      alert('User Create Successfully');
    });
    // console.log(this.f)
    console.log(this.gameForm.value)
  }

  // submitData() {
  //     this.GameForm.map((add) => {
  //       const payload = {
  //         scmTemplate: this.gameForm.controls['scmTemplate'].value,
  //         gameRounds: this.gameForm.controls['gameRounds']?.value,
  //         playersFile: this.gameForm.controls['playersFile']?.value,
  //         gameRoundDuration: this.gameForm.controls['gameRoundDuration']?.value,
  //         startDate: this.gameForm.controls['startDate']?.value,
  //         startTime: this.gameForm.controls['startTime']?.value,
  //       };
  //       this.final.push(payload);

  //       console.log(this.final)
  //     });
  //   }


  onFileUpload(event) {
    console.log(event)
    const file = event.target.files[0];
    console.log(file)
  }


}


