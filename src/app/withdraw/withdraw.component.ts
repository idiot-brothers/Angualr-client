import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').css("background-color", "#f7f7f7");
  }

}
