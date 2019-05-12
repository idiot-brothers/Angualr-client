import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, take, map, tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      bankName: ['', []],
      userType: ['', []],
      userId: ['', []],
      bankNumber: ['', []],
      userBirth: ['', []],
      userPwd: ['', []],
    });

  }

  setBank() {
    let param = {
      bank_name: this.createForm.value.bankName,
      account_order_name: this.createForm.value.userId,
      account_order_birthday: parseInt(this.createForm.value.userBirth, 10),
      account_type: parseInt(this.createForm.value.userType, 10),
      bank_account_number: this.createForm.value.bankNumber,
      bank_account_password: parseInt(this.createForm.value.userPwd, 10),
    };
    this.ngxService.start();
    this.http.post(`${environment.server.url}/api/users/bank`, param, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    })
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe(ret => {
        $("#centralModalSuccess").modal('toggle').on('hidden.bs.modal', (e) => {
          this.router.navigate(['/card']);
        });
      });

    console.log('param', param);
  }

}
