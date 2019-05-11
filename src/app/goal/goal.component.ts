import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').css("background-color", "#f7f7f7");
  }

}
