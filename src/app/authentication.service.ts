import { Injectable } from '@angular/core';
import { of,BehaviorSubject } from 'rxjs';
import { UserManager, UserManagerSettings, User,Log, WebStorageStateStore,WebStorageStateStoreSettings } from 'oidc-client';
import { JwtHelperService } from '@auth0/angular-jwt';
import {options} from './../options';

const helper = new JwtHelperService();



 //Log.logger = console;
 //Log.level = Log.DEBUG;
const settings:UserManagerSettings = {
  userStore: new WebStorageStateStore({store:window.localStorage}),
  authority: options.authSever,
  client_id: options.clientId,
  redirect_uri: `${options.webUrl}assets/signin-callback.html`,
   
  silentRequestTimeout: 60000,
  
  filterProtocolClaims: false,
  loadUserInfo: true,
  monitorSession : false,
  revokeAccessTokenOnSignout: true,
  silent_redirect_uri: `${options.webUrl}assets/silent-callback.html`,
  automaticSilentRenew: true,
  post_logout_redirect_uri: `${options.webUrl}callback`,
  response_type: options.response_types,
  scope: options.scopes
};
const _userManager: UserManager = new UserManager(settings);
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
profileName = "";

 
constructor() {
 }

getUserManager() {
 return _userManager.events;
}
 isLoggedIn(){
   const token =  window.localStorage.getItem('access_token');
     if(token===null) {
     
      return false;
     }
     return !helper.isTokenExpired(token);
     
    
  }
  public getUser() {
       _userManager.getUser().then(user=> {
         if(user) {
      this.profileName =user.profile.username;
         }
    });
  }

  getUserName() {
    
    return this.profileName;
  }
  public renewToken(): Promise<User> {
    return _userManager.signinSilent();
   
  }

  public silent_callback() {
    return _userManager.signinSilentCallback();
   
  }
  logOut() {
    window.localStorage.setItem('access_token','');
    window.localStorage.setItem('authenticated','false');
    _userManager.signoutRedirect().then((result)=> {
      console.log(`signoutRedirect result: ${result}`);
        
    }).catch(error=> console.log(error));
  }
logOn() {
  _userManager.signinRedirect().then(result=> {
    
    console.log(`signinRedirect result: ${result}`);
  }).catch(error=> console.log(error));
}
  authenticateUser(user:string,password:string) {
   /* return of(this.usersDb.map(users=> {
        if(users.username === user && users.password ===password)
          {
            this.authenticated =true;
            window.localStorage.setItem('authenticated','true');
            return this.authenticated;
          } else {
            this.authenticated =false;
            return this.authenticated;
          }
   })); */
   return of(_userManager.signinRedirect());
  }

  processSignResponse() {
   return _userManager.processSigninResponse().then((Response)=> {
return Response;
    });
  }
}
