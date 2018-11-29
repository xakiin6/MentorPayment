import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from './../authentication.service';
import { CanActivate, Router, UrlHandlingStrategy } from '@angular/router';
var window:any;
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private router:Router,private auth:AuthenticationService) { }

  ngOnInit() {
    this.auth.logOn();
  }


}
