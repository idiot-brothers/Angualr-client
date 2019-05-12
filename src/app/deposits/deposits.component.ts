import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { MoneyService } from '../services/money.service'
declare var $: any;

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
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
  userName: string;

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

  constructor(private router: Router, private moneyService: MoneyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userName = this.activatedRoute.snapshot.paramMap.get("userId");
    console.log('userName', this.userName);
  }

}
