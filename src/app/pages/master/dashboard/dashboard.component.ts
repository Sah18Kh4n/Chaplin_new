import { Component, OnInit, ViewChild } from '@angular/core';

import { LineChartComponent } from './../../../shared/components/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild("lineChart") lineChart: LineChartComponent;
  config = {
    title: {
      text: ' ',
    },

    // subtitle: {
    //   text: 'Source: thesolarfoundation.com',
    // },
    chart: {
      backgroundColor: 'transparent',
      // height: '44%',
      fontFamily: "SourceSans"
    },

    yAxis: {
      title: {
        text: 'Revenue',
        style: {
          fontSize: 14,
          color: '#FFFFFF',
        },
      },
      // lineColor: "transparent",
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
      title: {
        text: 'Rounds',
        style: {
          fontSize: 14,
          color: '#FFFFFF',
        },
      },
      // lineColor: "transparent",
      tickLength: 0,
      labels: {
        style: {
          fontSize: 11,
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
      },
      lineWidth: 1,
      gridLineColor: 'transparent',
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        color: '#FFFFFF',
      },
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
        data: [43934, 52503, 57177, 69658, 97031, 89931, 57133, 64175],
      },
      {
        name: 'Player 2',
        type: 'line',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
      },
      {
        name: 'Player 3',
        type: 'line',
        data: [21916, 23064, 7988, 12169, 15112, 22452, 34400, 34227],
      },
      {
        name: 'Player 4',
        type: 'line',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
      },
      {
        name: 'Player 5',
        type: 'line',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
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

  gameProgress: any[] = [];
  gameLeaderboard: any[] = [];
  isCollapsed: boolean = false;

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
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ];

    this.gameLeaderboard = [
      // {
      //   round: 1,
      //   playerId: "Player 1",
      //   revenue: 10000,
      //   inventory: 60,
      //   sales: 50,
      // }
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ]
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.lineChart.onResize();
  }
}
