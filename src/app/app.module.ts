import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { ChartsModule } from 'ng2-charts';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { GoalComponent } from './goal/goal.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PdfComponent } from './pdf/pdf.component';
import { BankComponent } from './bank/bank.component';
import { CardComponent } from './card/card.component';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';
import { DepositsComponent } from './deposits/deposits.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.fadingCircle,
  fgsColor: "#fff",
  hasProgressBar: false
};
const appRoutes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'goal', component: GoalComponent, canActivate: [AuthGuard] },
  { path: 'pdf', component: PdfComponent, canActivate: [AuthGuard] },
  { path: 'bank', component: BankComponent, canActivate: [AuthGuard] },
  { path: 'card', component: CardComponent, canActivate: [AuthGuard] },
  { path: 'deposits/:userId', component: DepositsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },

  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    WithdrawComponent,
    GoalComponent,
    PdfComponent,
    BankComponent,
    CardComponent,
    DepositsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HttpClientModule,
    BrowserModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
