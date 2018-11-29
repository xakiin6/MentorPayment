import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public AuthService:AuthenticationService,private router:Router) {


   }

  canActivate(): boolean {
    if (this.AuthService.isLoggedIn()===false) {
     this.router.navigate(['callback']);
     return false;
    } else {
    return true;
    }
   
  }
}
