import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassPaymentsComponent } from './class-payments/class-payments.component';
import { ProjectPaymentsComponent } from './project-payments/project-payments.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { RatingComponent } from './rating/rating.component';
import { ReversePipe } from './reverse.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { IncomeComponent } from './income/income.component';
import { CallbackComponent } from './callback/callback.component';
import { SilentCallbackComponent } from './silent-callback/silent-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassPaymentsComponent,
    ProjectPaymentsComponent,
    DashboardComponent,
    LoginComponent,
    PageNotFoundComponent,
    MessagesComponent,
    RatingComponent,
    ReversePipe,
    IncomeComponent,
    CallbackComponent,
    SilentCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production,scope:'#/' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
