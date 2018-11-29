import { Component, OnInit, AfterViewInit } from '@angular/core';
import {PaymentsService} from './../payments.service';
import {MessageService} from './../message.service';

@Component({
  selector: 'app-class-payments',
  templateUrl: './class-payments.component.html',
  styleUrls: ['./class-payments.component.css']
})
export class ClassPaymentsComponent implements OnInit,AfterViewInit {
  payment:any[];
  
  newPayment = {week:'',students:0,total:0,paid:false,pDate:'',isvisible:false};
   title = 'mentor payment';
   p: number = 1;
  constructor(private pService:PaymentsService,private mService:MessageService) { }
  ngOnInit() {
    this.getClassPayments();
    if(this.payment && this.payment.length <=0) {
      this.payment = JSON.parse(window.localStorage.getItem('class'));
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.mService.setTitle(this.title);
      });
  }
  getClassPayments():void{
    this.pService.getClassPayments().subscribe(p=> this.payment =p);
  }
  editPayment(currentPayment) {
    
    if(currentPayment.isvisible ==false) {
      currentPayment.isvisible =true;
      
    
    } else if(currentPayment.isvisible==true) {
      
      currentPayment.isvisible =false;
      //currentPayment.total = currentPayment.students *9;
      window.localStorage.setItem('class',JSON.stringify(this.payment));
      this.pService.postData(this.payment,0);
    }
 
    
  }
  

  showForm(newcurPayment){
    
  

      if(newcurPayment.week ==="")
      return;
    
     
      newcurPayment.isvisible=false;
      this.newPayment.isvisible =false;
      
      if(this.payment) {
       // newcurPayment.total = newcurPayment.students *9;
            this.payment.push(newcurPayment);
            window.localStorage.setItem('class',JSON.stringify(this.payment));
     this.pService.postData(this.payment,0);
      }
    
  }
}


