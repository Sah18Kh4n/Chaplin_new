import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { twoDigits } from 'src/app/helpers/util';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input("minutes") minutes: number = 30;
  @Output("timesUp") timesUp = new EventEmitter<boolean>();
  private subscription: Subscription;

  public dateNow;
  public dDay; //new Date('Jan 01 2021 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    if (this.timeDifference <= 0) {
      this.subscription.unsubscribe();
      this.timesUp.emit(true);
    }
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  ngOnInit() {
    this.dateNow = new Date();
    this.dDay = this.addMinutes(this.dateNow, this.minutes); //new Date('Jan 01 2021 00:00:00');
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  convertToToDigits = twoDigits

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
