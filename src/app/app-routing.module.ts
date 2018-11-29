import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ClassPaymentsComponent }      from './class-payments/class-payments.component';
import { ProjectPaymentsComponent }  from './project-payments/project-payments.component';
import {LoginComponent} from './login/login.component';
import {RatingComponent} from './rating/rating.component';
import {AuthGuardService} from './auth-guard.service';
import { IncomeComponent } from './income/income.component';
import { CallbackComponent } from './callback/callback.component';
import { SilentCallbackComponent } from './silent-callback/silent-callback.component';


const routes: Routes = [
  
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService] },
  { path: 'projectpayments', component: ProjectPaymentsComponent,canActivate: [AuthGuardService] },
  { path: 'classpayments', component: ClassPaymentsComponent,canActivate: [AuthGuardService] },
  {path:'rating',component:RatingComponent,canActivate:[AuthGuardService]},
  {path:'incomeSummary',component:IncomeComponent,canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent },
  {path:'callback',component:CallbackComponent},
  {path:'silent-callback',component:SilentCallbackComponent},
  {path:'', redirectTo:'/dashboard',pathMatch:'full'},
  { path: '**', redirectTo: '' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
