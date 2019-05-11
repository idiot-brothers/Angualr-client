import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: string = "login";
  bodyColor;
  constructor() { }

  ngOnInit() {
    this.bodyColor = $('body').css("background-color");
    console.log(this.bodyColor);
  }

  changeAuthForm(form: string) {
    this.authForm = form;

    if (this.authForm == "register") {
      console.log("asdf");
      $('body').css("background-color", "#f7f7f7");
    } else {
      $('body').css("background-color", this.bodyColor);
    }
  }

}
