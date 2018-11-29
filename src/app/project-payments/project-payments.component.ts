import { Component, OnInit,Output, AfterViewInit } from '@angular/core';
import {PaymentsService} from './../payments.service';
import {MessageService} from './../message.service';

@Component({
  selector: 'app-project-payments',
  templateUrl: './project-payments.component.html',
  styleUrls: ['./project-payments.component.css']
})
export class ProjectPaymentsComponent implements OnInit,AfterViewInit {

  constructor(private pService:PaymentsService,private mService:MessageService) { }
  payment:any;
  newPayment = {month:'',projects:0,total:0,paid:false,pDate:'',isvisible:false}
  title = 'Reviews payment';
  p:number=1;
  ngOnInit() {
    
    this.getProjectPayments();
    if(this.payment && this.payment.length <=0) {
      this.payment = JSON.parse(window.localStorage.getItem('reviews'));
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.mService.setTitle(this.title);
      });
  }
  getProjectPayments=()=>{
    this.pService.getProjectPayments().subscribe(p=> {
      
      this.payment=  p;
    });
  }

  editPayment=(currentPayment)=> {
    if(currentPayment.isvisible ===false) {
      currentPayment.isvisible =true;
    
    } else {
      currentPayment.isvisible =false;
      window.localStorage.setItem('reviews',JSON.stringify(this.payment));
     this.pService.postData(this.payment,1);
    }
    
     
  }

  showForm=(newcurPayment)=>{
     if(newcurPayment.month ==="")
        return;
      
     
      newcurPayment.isvisible=false;
      this.newPayment.isvisible =false;
      
      if(this.payment) {
            this.payment.push(newcurPayment);
            window.localStorage.setItem('reviews',JSON.stringify(this.payment));
     this.pService.postData(this.payment,1);
      }
     
    
  }

}
