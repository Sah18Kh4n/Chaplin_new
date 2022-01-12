import * as Highcharts from 'highcharts';

import { Component, OnInit, ViewChild } from '@angular/core';

import { LineChartComponent } from './../../../shared/components/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  config: any = {};
  @ViewChild("lineChart") lineChart: LineChartComponent;

  gameProgress: any[] = [];
  gameLeaderboard: any[] = [];
  isCollapsed: boolean = false;

  round: number = 5;
  totalRounds: number = 20;

  ratings = [
    {
      stars: 1,
      player: "Player 1",
      price: 14500
    },
    {
      stars: 2,
      player: "Player 2",
      price: 12300
    },
    {
      stars: 3,
      player: "Player 3",
      price: 10750
    }
  ]

  constructor() {}

  ngOnInit(): void {
    this.gameProgress = [
      // {
      //   round: 1,
      //   playerId: "Player 1",
      //   demand: 56,
      //   farmer1: 60,
      //   farmer2: 60,
      // }
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ];

    this.gameLeaderboard = [
      // {
      //   round: 1,
      //   playerId: "Player 1",
      //   revenue: 10000,
      //   inventory: 60,
      //   sales: 50,
      // }
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ];

    const that = this;
    this.config = {
      title: {
        text: ' ',
      },
      chart: {
        backgroundColor: 'transparent',
        height: '40%',
        // padding: "10px",
        fontFamily: "SourceSans"
      },

      yAxis: {
        title: {
          text: ' ',
          style: {
            fontSize: 12,
            color: '#FFFFFF',
            fontFamily: "SourceSans"
          },
        },
        tickLength: 0,
        labels: {
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontFamily: "SourceSans"
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
            return Highcharts.dateFormat('%b', this.value).toUpperCase();
          },
          style: {
            fontSize: 14,
            // fontWeight: 'bold',
            color: '#FFFFFF',
            fontFamily: "SourceSans"
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
              fontSize: 10,
              // fontWeight: 'bold',
              color: '#FFFFFF',
              fontFamily: "Babylon"
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
            [Date.UTC(2014, 5, 1), 4],
            [Date.UTC(2014, 6, 1), 6],
          ],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 300,
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

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.lineChart.onResize();
  }
}
