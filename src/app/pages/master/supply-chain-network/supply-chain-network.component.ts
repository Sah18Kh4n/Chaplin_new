import * as Highcharts from 'highcharts';

import { Component, OnInit, ViewChild } from '@angular/core';

import { PopupComponent } from './../../../shared/components/popup/popup.component';

@Component({
  selector: 'app-supply-chain-network',
  templateUrl: './supply-chain-network.component.html',
  styleUrls: ['./supply-chain-network.component.css'],
})
export class SupplyChainNetworkComponent implements OnInit {
  round: number = 2;
  balance: string = '$4,500';
  time: number = 20;
  demand: string = '122/400';

  progressWidth: number = 66;

  isCollapsed: boolean = false;

  @ViewChild('popupLeft') popupCompLeft: PopupComponent;
  @ViewChild('popupRight') popupCompRight: PopupComponent;

  config: any = {};

  constructor() {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
    const that = this;
    this.config = {
      title: {
        text: ' ',
      },
      chart: {
        backgroundColor: 'transparent',
        height: '40%',
        fontFamily: "SourceSans"
      },

      yAxis: {
        title: {
          text: ' ',
          style: {
            fontSize: 14,
            color: '#FFFFFF',
          },
        },
        tickLength: 0,
        labels: {
          style: {
            fontSize: 11,
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
        },
        gridLineColor: 'transparent',
        gridLineWidth: 0,
        lineWidth: 1,
        plotLines: [
          {
            color: '#FFFFFF',
            width: 1,
            value: 0,
          },
        ],
      },

      xAxis: {
        lineWidth: 1,
        gridLineColor: 'transparent',

        type: 'datetime',
        // tickInterval: 1000 * 3600 * 24 * 30, // 1 month
        labels: {
          dateTimeLabelFormats: {
            day: '%d %b %Y', //ex- 01 Jan 2016
          },
          formatter() {
            return Highcharts.dateFormat('%b', this.value);
          },
          style: {
            fontSize: 11,
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
        },
      },

      legend: {
        enabled: false,
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
            style: {
              fontSize: 14,
              // fontWeight: 'bold',
              color: '#FFFFFF',
            },
          },
          pointStart: 0,
        },
      },

      series: [
        {
          name: 'Player 1',
          type: 'line',
          data: [
            [Date.UTC(2014, 0, 1), 1],
            [Date.UTC(2014, 1, 1), 3],
            [Date.UTC(2014, 2, 1), 3],
            [Date.UTC(2014, 3, 1), 2],
            [Date.UTC(2014, 4, 1), 5],
            [Date.UTC(2014, 5, 1), 7],
            [Date.UTC(2014, 6, 1), 6],
          ],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      credits: {
        enabled: false,
      },
    };
  }

  openPopup(type: string) {
    if (type === 'left') {
      this.popupCompLeft.toggleShow();
    }

    if (type === 'right') {
      this.popupCompRight.toggleShow();
    }
  }

  private getTimeFormat(value: number) {
    return (
      new Date(value).toLocaleDateString('en') +
      ' ' +
      new Date(value).toLocaleTimeString('en', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }
}
