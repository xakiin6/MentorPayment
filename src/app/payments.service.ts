import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {options} from './../options';


import { MessageService } from './message.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  classPayments=[];
  projectPayments=[];
  ChartLabels = [];
    csum =[];
    psum=[];
   monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
   
   public localCurrency = window.localStorage.getItem('localcurrency') || "";
   Urls = [`${options.apiUrl}/api/class`,`${options.apiUrl}/api/reviews`]
   constructor(private messageService: MessageService,private router: Router) { 
    
   }

  
getXeExchangeRate() {
  let xe =parseFloat(window.localStorage.getItem('xe')) || 0.00;
  if(xe===0) {
       this.messageService.clear();
       this.messageService.add({message:'<strong>Warning:</strong> Exchange rate is not set, <a href="dashboard#Settings-dialog" class="active">click here</a> to set it!',type:'color-warning'});
  }
return  xe;
}

getPayoneerRate() {
  return parseFloat(window.localStorage.getItem('Payoneer')) || 0.00;
}


getOverview(){
 return of(this.Urls.map(url => { 
  
 return  fetch(url,{method:'GET', headers: {'Authorization':`Bearer ${window.localStorage.getItem('access_token')}`,'content-type':'application/json','Accept-Encoding': 'gzip'}}).then(y => y.json()).then(response=> {
  if(url.toString().indexOf('reviews')===-1) {
  window.localStorage.setItem('class-raw',JSON.stringify(response)); 
  } else {
    window.localStorage.setItem('reviews-raw',JSON.stringify(response)); 
  }
  return response})
 .catch(error => {
   this.messageService.clear(); 
   this.messageService.add({message:navigator.onLine ?'Data is not live! getting data from the local cache!':'No connectivity! application is offline.',type:'color-error'});
   setTimeout(()=> {
     this.messageService.clear();
   }, 10000);
   return this.getFromCache(url);
  
})
 }));
}
 timeout(ms, promise) {
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

public getFromCache(url) {
if(url.toString().indexOf('reviews')===-1) {
  return JSON.parse(window.localStorage.getItem('class-raw'));
} else {
  return JSON.parse(window.localStorage.getItem('reviews-raw'));
}
}
cachecpSums(csum,psum,monthlabels){
  window.localStorage.setItem('csum',JSON.stringify(csum));
  window.localStorage.setItem('psum',JSON.stringify(psum));
  window.localStorage.setItem('monthlabels',JSON.stringify(monthlabels));
}

getReviewsSum() {
  return JSON.parse(window.localStorage.getItem('psum')) || [];
}

getClassSum(){
  return JSON.parse(window.localStorage.getItem('csum')) || [];
}
getMonthLabels() {
  return JSON.parse(window.localStorage.getItem('monthlabels')) || [];
}
async  getOverviewStats(a:any){
  this.ChartLabels = [];
  this.csum =[];
  this.psum =[];
  
    this.CalculateChartData(a[1],1);
    this.CalculateChartData(a[3],0);
    this.cachecpSums(this.csum,this.psum,this.ChartLabels);
   return  this.sumAmount(a[0].concat(a[2]));
  
    }

  getClassPayments(){
    
     return of(this.classPayments);
  }

  getProjectPayments(){
    return of(this.projectPayments);
  }
sumAmount(payment){
  
  let paidtotal =0;
  let unpaidTotal =0;
  let midnextmonth=0;
  for(var i=0; i<= payment.length;i++){
  if(payment[i] && payment[i].paid ===true) {
      let pdate = new Date(payment[i].pDate);
      let ndate = new Date();
      if(pdate.getMonth() === ndate.getMonth()) {
      paidtotal+= parseFloat(payment[i].total);
      }
  } else {
    if(payment && payment[i]) {
      let pdate = new Date(payment[i].week || payment[i].month);
      
      let ndate = new Date();
        
        if(pdate.getMonth()=== ndate.getMonth()-1) {
        midnextmonth += parseFloat(payment[i].total);
        } else {
          unpaidTotal += parseFloat(payment[i].total);
        }
    }
  }
}

  return {Paid:paidtotal,Unpaid:unpaidTotal,MidNextMonth:midnextmonth,daysAvg:0};
}

CalculateChartData(payment,d){
  
for(var i=0; i<= payment.length;i++){
    if(payment[i]) {
      let date = new Date((payment[i].paid===true?payment[i].pDate:payment[i].month));
      if(d===1) {
      this.csum.push(payment[i].total);
      } else {
        this.psum.push(payment[i].total);
      }
      if(this.ChartLabels.length <=0) {
        this.ChartLabels.push(this.monthNames[date.getMonth()]);
       
      }
      
      if(this.ChartLabels.indexOf(this.monthNames[date.getMonth()]) === -1){
              this.ChartLabels.push(this.monthNames[date.getMonth()]);
    }
  }
  
}
}


ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
csvJSON(csv){

  var lines=csv.split("\n");
  var result = [];
  var headers= lines[0].split(",");
  headers.push("Isvisible");
  for(var i=1;i<lines.length-1;i++){

      var obj = {};
      var currentline=lines[i].split(",");
       currentline.push(false);
      for(var j=0;j<headers.length;j++){
        var data=currentline[j];
        if(j===3) {
          data= (data==="Yes"?true:false);
        }
        obj[headers[j]] = data;
        
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return result; //JSON
}
 postData(data, url) {
  // Default options are marked with *
  return fetch(this.Urls[url], {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'content-type':'application/json',
    'Accept-Encoding': 'gzip',
    'Authorization':`Bearer ${window.localStorage.getItem('access_token')}`
  }
  }).then(res=> {
    this.messageService.clear();
    if(res.status.toString().startsWith("2")){
     this.messageService.add({message:'Success completed',type:'color-success'}); 
    } else {
      this.messageService.add({message:'Faild!,action did not completed! Try again later.',type:'color-error'}); 
    }
    setTimeout(()=> {
    this.messageService.clear();
}, 5000);})
  .catch(error => {this.messageService.clear(); 
    this.messageService.add({message:navigator.onLine ?'Faild!,action did not completed! Try again later.':'No connectivity! application is offline.',type:'color-error'});
  setTimeout(()=> {
    this.messageService.clear();
}, 5000);
}) // parses response to JSON
}
}
