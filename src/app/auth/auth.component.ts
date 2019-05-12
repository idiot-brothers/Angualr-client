import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, take, map, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: string = "login";
  createForm: FormGroup;
  bodyColor;

  modal = {
    title: "",
    body: ""
  }

  readonly loginCondition = {
    userId: ['', []],
    userPwd: ['', []],
  }
  readonly registerCondition = {
    userId: ['', []],
    userEmail: ['', []],
    userPwd: ['', []],
    userPhone: ['', []],
    userCode: ['', []],
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.bodyColor = $('body').css("background-color");



    this.createForm = this.formBuilder.group(this.loginCondition);
  }

  changeAuthForm(form: string) {
    this.authForm = form;

    if (this.authForm == "register") {
      $('body').css("background-color", "#f7f7f7");
      this.createForm = this.formBuilder.group(this.registerCondition);
    } else {
      $('body').css("background-color", this.bodyColor);
      this.createForm = this.formBuilder.group(this.loginCondition);
    }
  }

  sendCode() {
    let param = {
      email: this.createForm.value.userEmail,
      phone: this.createForm.value.userPhone,
    };
    this.ngxService.start();
    this.http.post(`${environment.server.url}/api/auth/phone`, param)
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe(ret => {
        $("#centralModalInfo").modal('toggle')
      });

  }

  register() {
    let param = {
      name: this.createForm.value.userId,
      email: this.createForm.value.userEmail,
      phone: this.createForm.value.userPhone,
      code: this.createForm.value.userCode,
      password: this.createForm.value.userPwd,
    };
    this.ngxService.start();
    this.http.post(`${environment.server.url}/api/auth/register`, param)
    this.http.post(`${environment.server.url}/api/auth/login`, param)
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe(ret => {
        this.modal.title = "Register Success";
        $("#centralModalSuccess").modal('toggle').on('hidden.bs.modal', (e) => {
          this.authForm = "login";

          $('body').css("background-color", this.bodyColor);
          this.createForm = this.formBuilder.group(this.loginCondition);

        });
        console.log("register()", ret);
        console.log("param ", param);
      });
  }

  login() {
    let param = {
      email: this.createForm.value.userId,
      password: this.createForm.value.userPwd
    };

    console.log("param ", param);
    this.ngxService.start();
    this.http.post(`${environment.server.url}/api/auth/login`, param)
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe((ret: any) => {
        localStorage.setItem("token", ret.token);
        this.modal.title = "Login Success";
        $("#centralModalSuccess").modal('toggle').on('hidden.bs.modal', (e) => {
          this.router.navigate(['/home']);
        });
      });
  }


}
