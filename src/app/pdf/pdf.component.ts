import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, take, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private ngxService: NgxUiLoaderService) { }
  link: string;
  ngOnInit() {
  }

  getPdf() {
    this.ngxService.start()
    this.http.get(`${environment.server.url}/api/users/deposits/pdf`)
      .pipe(
        finalize(() => this.ngxService.stop())
      )
      .subscribe((ret: any) => {
        console.log('ret', ret);
        window.open(ret.url);
      });
  }

}
