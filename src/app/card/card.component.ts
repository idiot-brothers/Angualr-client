import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, take, map, tap } from 'rxjs/operators';


declare var $: any;
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      cardNumber: ['', []],
      cardExpire: ['', []],
      cardCvc: ['', []],
    });
  }

  setCard() {
    console.log(this.createForm.value.cardExpire);
    console.log(this.createForm.value.cardNumber);
    console.log(this.createForm.value.cardCvc);
    let stringTemp = this.createForm.value.cardExpire;
    let temp = stringTemp.split('/');
    let month = temp[0];
    let year = temp[1];

    let param = {
      card_no: this.createForm.value.cardNumber,
      card_valid_month: month,
      card_valid_year: year,
      card_valid_cvc: parseInt(this.createForm.value.cardCvc, 10),
    };
    this.ngxService.start();
    this.http.post(`${environment.server.url}/api/users/card`, param, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    })
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe(ret => {
        console.log("성공!!! >_<", ret);
        $("#centralModalSuccess").modal('toggle').on('hidden.bs.modal', (e) => {
          this.router.navigate(['/home']);
        });
      });

    console.log('param', param);
  }

}
