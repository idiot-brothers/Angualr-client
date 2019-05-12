import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, take, map, tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      goalName: ['', []],
      goalPrice: ['', []],
    });
    $('body').css("background-color", "#f7f7f7");
  }

  setGoal() {
    let param = {
      title: this.createForm.value.goalName,
      goal_price: parseInt(this.createForm.value.goalPrice, 10)
    };

    console.log("param", param);
    this.ngxService.start();
    this.http.post(`${environment.server.url}/api/users/goals`, param, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    })
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe(ret => {
        $("#centralModalSuccess").modal('toggle').on('hidden.bs.modal', (e) => {
          this.router.navigate(['/withdraw']);
        });
        console.log("register()", ret);
        console.log("param ", param);
      });

  }

}
