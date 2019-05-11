import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { MoneyService } from '../services/money.service'
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ["08:00", "12:00", "18:00", "22:00", "Total"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [30, 45, 25, 45, 90], label: 'use' },
  ];

  today = [];
  isMode = "today";

  todayAM = [
    {
      name: "GS26 Convenience",
      point: "17",
      time: "06:26",
      amount: "170",
      persent: 10
    },
    {
      name: "Teppan Baby Shinjuku",
      point: "25",
      time: "07:02",
      amount: "250",
      persent: 10
    },
    {
      name: "GINZA 300BAR 8CHOME",
      point: "19.9",
      time: "09:12",
      amount: "199",
      persent: 10
    }
  ]

  todayPM = [
    {
      name: "IN-AND-OUT BIRGER",
      point: "10",
      time: "12:23",
      amount: "200",
      persent: 5
    },
    {
      name: "Taco Bell",
      point: "6",
      time: "02:00",
      amount: "30",
      persent: 20
    },
    {
      name: "ShakeShack Burger",
      point: "Except",
      time: "03:44",
      amount: "330",
      persent: "Except"
    }
  ]



  constructor(private router: Router, private moneyService: MoneyService) { }

  ngOnInit() {
    $('body').css("background-color", "#f7f7f7");
    // $(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    });

    $('#sidebarbtn').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    // });
  }

  changeMode(mode) {
    this.isMode = mode;

    if (mode == 'today') {
      this.barChartLabels = ["08:00", "12:00", "18:00", "22:00", "Total"];
      this.barChartData = [
        { data: [30, 45, 25, 45, 90], label: 'use' },
      ];
    }

    if (mode == 'week') {
      this.barChartLabels = ["SUN", "MON", "TUE", "WED", "Today"];
      this.barChartData = [
        { data: [95, 105, 65, 90, 465], label: 'use' },
      ];
    }

    if (mode == 'month') {
      this.barChartLabels = ["1st", "2nd", "3rd", "4th", "next"];
      this.barChartData = [
        { data: [380, 400, 300, 390, 1625], label: 'use' },
      ];
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }




}
