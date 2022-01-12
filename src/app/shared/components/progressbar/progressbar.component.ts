import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
})
export class ProgressbarComponent implements OnInit, AfterViewInit {
  @Input('width') width: number = 0;
  @Input('color') color: string = "primary";
  @Input('size') size: string = 'md';
  @Input('nostripes') nostripes: boolean = false;
  @Input('showCount') showCount: boolean = false;
  @Input('bgColor') bgColor: string = "white";
  constructor() {}
  ngAfterViewInit(): void {
    // $('.meter > span').each(function () {
    //   $(this)
    //     .data('origWidth', $(this).width())
    //     .width(0)
    //     .animate(
    //       {
    //         width: $(this).data('origWidth'),
    //       },
    //       1200
    //     );
    // });
  }

  ngOnInit(): void {}
}
