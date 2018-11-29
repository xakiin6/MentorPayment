import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {AuthenticationService} from './../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userModel:Users = new Users();
  showError=false;
  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
    setTimeout(() => {
    const isAuth = window.localStorage.getItem('authenticated');
  if(isAuth===null || isAuth==='false') {

this.authService.logOn();
  }
   else {
      this.authService.logOut();
   }
  });
  }


  authenticate(uModel:Users) {
  this.authService.logOn();
    //  this.authService.authenticateUser(uModel.email,uModel.password);
    
   /*  .subscribe(auth=>{
     console.log(auth);
     
      if(auth[0]===true) {
        this.showError=false;
        this.router.navigate(['']);
      } else {
        uModel = new Users();
        this.showError=true;
      }
    }) */
  }

}

 class Users{
  
  email:string;
  password:string;
  
}


