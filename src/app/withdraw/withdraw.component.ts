import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, take, map, tap } from 'rxjs/operators';
import { MoneyService } from '../services/money.service'
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare var $: any;

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  goalsObservable$: Observable<any>;
  goalPercent: number = 0;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private moneyService: MoneyService
    , private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    $('body').css("background-color", "#f7f7f7");

    this.getGoals();
  }

  getGoals() {
    this.ngxService.start();
    this.goalsObservable$ = this.http.get(`${environment.server.url}/api/users/goals`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    })
      .pipe(
        map((data: any) => {

          data.forEach((d: any) => {
            d.goal_price = this.moneyService.today * 100 / d.goal_price;
            d.goal_price_int = parseInt(d.goal_price, 10);
          });
          // console.log(d);
          // console.log(parseInt(d.goal_price, 10) * 100);
          // console.log('goal :', d.goal_price * 100 / this.moneyService.week);
          return data;
        }),
        finalize(() => this.ngxService.stop()),

        tap(data => console.log('[orderer-list.componenet] #queryOrdererServer - data:', data)),
      )
  }

  withdraw() {
    $("#centralModalDanger").modal('toggle');
  }

}
