import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-silent-callback',
  templateUrl: './silent-callback.component.html',
  styleUrls: ['./silent-callback.component.scss']
})
export class SilentCallbackComponent implements OnInit {
  
  constructor(public auth:AuthenticationService) {
    
   }

  ngOnInit() {
   this.auth.silent_callback().catch(error=> {
    console.log(error);
  });
  }

}
