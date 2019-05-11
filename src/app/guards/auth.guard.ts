import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    return true;
    // if (!this.auth.isAuthenticated()) {
    //   console.log("1111");
    //   this.router.navigate(['auth']);
    //   return false;
    // }
    // console.log("2222");
    // return true;
  }

}
