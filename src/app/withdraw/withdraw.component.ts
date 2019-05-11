import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    $('body').css("background-color", "#f7f7f7");

    this.getGoals();
  }

  getGoals() {
    this.http.get(`${environment.server.url}/api/users/goals`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    })
      .subscribe(ret => {
        console.log("ret()", ret);
      });
  }

}
