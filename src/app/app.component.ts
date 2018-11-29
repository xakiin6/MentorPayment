import { Component,OnInit, AfterViewInit,OnDestroy, NgZone } from '@angular/core';
import {PaymentsService} from './payments.service';
import {MessageService} from './message.service';
import {AuthenticationService} from './authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit,OnDestroy {
  title = 'app';
 
  gservice:MessageService;
  laststate=true;
constructor(private _ngZone: NgZone,public pService:PaymentsService,public mService:MessageService,public authService:AuthenticationService) {
this.gservice=mService;
}
  ngOnInit() {
    
 this.authService.getUserManager().addUserLoaded(user=> {
  //console.log(`addUserLoaded: ${JSON.stringify(user)}`);
  this.authService.getUser();
 });
 

 this.authService.getUserManager().addAccessTokenExpiring((result)=> {
  //console.log("addAccessTokenExpiring=>Token Expiring and renewing now:"+ result);  
  this.authService.renewToken().then(user=> {
    
    window.localStorage.setItem('access_token',user.access_token);
    window.localStorage.setItem('authenticated','true');
  })
 });
 this.authService.getUserManager().addUserSessionChanged(result=> {
  //console.log("addUserSessionChanged => Token Expiring and renewing now:"+ result);  
  this.authService.renewToken();
 });

 this.authService.getUserManager().addSilentRenewError(result=> {

  this.authService.renewToken().catch(error=> {
    this.authService.logOut();
  })
 }
 );
  }
  ngAfterViewInit() {
    

      setTimeout(() => {
    
        this.mService.setTitle(this.title);
      this.mService.isOnline().subscribe(_online=> {
       
           this.updateOnlineStatus(_online);
      });
         
      });
     
   
   
   }

  getParameterByName(name, url=null) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
  ngOnDestroy() {
    this.authService.getUserManager().removeUserLoaded(user=> {
    //  console.log(`removeUserLoaded: ${user}`);
    }); 
    this.authService.getUserManager().removeAccessTokenExpiring(user=> {
      //console.log(`removeAccessTokenExpiring: ${user}`);
    }); 

    this.authService.getUserManager().removeUserSessionChanged(user=> {
      //console.log(`removeUserSessionChanged: ${user}`);
    }); 
    this.authService.getUserManager().removeSilentRenewError(user=> {
      //console.log(`removeSilentRenewError: ${user}`);
    }); 

  }
  

 
  
     updateOnlineStatus(_online) {
    
      var condition = _online ? "online" : "offline";
        if(this.laststate ===false && _online ===true) {
          window.setTimeout(()=> {
            this.gservice.clear();
            this.gservice.add({message:`Connection is re-established and status is ${condition}`,type:'color-info'});
          });
 window.setTimeout(()=> {
  this.gservice.clear();
}, 5000);
        }
        else if(_online ===false) {
          window.setTimeout(()=> {
          this.gservice.add({message:`Connection status is ${condition}, trying to reconnect!...`,type:'color-error'});
        });
        }
      
  
   
    
    this.laststate =_online;
    }
  
 

}
