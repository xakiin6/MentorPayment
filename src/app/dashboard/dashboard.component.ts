import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { PaymentsService} from './../payments.service';
import { MessageService} from './../message.service';
import {  all } from 'q';

import { Chart } from 'chart.js';
import   'chartjs-plugin-datalabels';
import { AuthenticationService } from '../authentication.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  title = 'Overview';
  charts:any[] =[];
  alldata =[];
  totalmentors = [];
  totalreviews= [];
  Xe_Exchange =0.0;
  Payoneer_Exchange=0.0;
  dataCompined = new Subject();
  Exchange_diff = 98.43846153846154;
  constructor(public pService:PaymentsService,private mService:MessageService,public auth:AuthenticationService,private ngZone: NgZone ) { }
  statis:any = null;
  lastMonthTotalDays =new Date(new Date().getFullYear(),new Date().getMonth(),0).getDate();
  monthTotalDays = new Date().getDate();
 
  ngOnInit() {
    this.Xe_Exchange =this.pService.getXeExchangeRate();
    this.Payoneer_Exchange = this.pService.getPayoneerRate();
    this.getStats();
   }
   ngAfterViewInit() {
    
    this.dataCompined.subscribe(d=> {
      if(d) {
      this.pService.getOverviewStats(d).then(st=> {
        let amount =(st.Paid <=0 ?st.MidNextMonth:st.Paid);
        console.log(`Amount :${amount}`);
        console.log(`lastMonthTotalDays :${this.lastMonthTotalDays}`);
        console.log(`monthTotalDays :${this.monthTotalDays}`);
        let daysAvg = (amount/this.lastMonthTotalDays)* this.monthTotalDays;
        console.log(`daysAvg :${daysAvg}`);
        
        
        st.daysAvg =  daysAvg;
        console.log(st);
        this.ngZone.run( () => { this.statis =st; 
         
        });
        if(this.statis) {
        this.initChart();
        }
        
      }); 
     
    }
      
    });
     
    setTimeout(() => {
   
    this.mService.setTitle(this.title);
    });
  }

  updateExchange =()=>{
    try {
      
    
    let Payoneer =parseFloat((this.Xe_Exchange-((this.Xe_Exchange * 2)/100)).toFixed(5));
    this.Payoneer_Exchange = Payoneer;
    window.localStorage.setItem('Payoneer',Payoneer.toString());
    window.localStorage.setItem('xe',this.Xe_Exchange.toString());
    window.localStorage.setItem('localcurrency',this.pService.localCurrency);
    this.mService.clear(); 
    this.mService.add({message:'Success exchange rate updated',type:'color-success'}); setTimeout(()=> {
      this.mService.clear();
  }, 5000);
} catch (error) {
 console.error(error);     
}
  }
 async getStats(){
   
  await this.pService.getOverview().subscribe(data=> {
    if(data) {
     
     
    all(data).then(value=> value.reduce((a:any[],b:any[])=>{ if(a && a[0]) { this.setAllData(a[0],'class');} if(b && b[0]) {this.setAllData(b[0],'reviews');}  this.dataCompined.next(a.concat(b)); }));
     
      
      }
    });
  }
  
  setAllData(data:any,name:string) {
    if(!data) {
        return;
    }
    window.localStorage.setItem(name,JSON.stringify(data));
    if(name==='class') {
      this.totalmentors = data.map(res=>res.total);
      this.pService.classPayments= data;
      
      
    } else {
      this.totalreviews = data.map(res=>res.Total);
      
      this.pService.projectPayments =data;
    }
  }

  initChart(){
    
   let chartCanvas= window.document.querySelector('#chartCanvas');
   var color = Chart.helpers.color;
   var chartColors = {
    red: '#c2c2c2',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: '#6200ee',
    grey: 'rgb(201, 203, 207)',
    black:'#000'
  };
  
  this.charts = new Chart(chartCanvas, {
    type: 'bar',
      data: {
        datasets: [{
          
              label: 'Mentor',
              data: this.pService.csum,
              // Changes this dataset to become a line
              
              backgroundColor: color(chartColors.red).alpha(0.9).rgbString(),
				borderColor: chartColors.red,
        borderWidth: 1,
        datalabels: {
          align: 'left',
          anchor: 'center',
         
        }
            
            },
         {  
            type: 'line',
            label: 'Review',
                data: this.pService.psum,
                backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
                borderColor: chartColors.purple,
                borderWidth: 1,fill:true,
                datalabels: {
                  align: 'top',
                  anchor: 'center',
                 
                }
             
              }],
        labels: this.pService.ChartLabels
      },
      options: {
        responsive:true,
        maintainAspectRatio:true,
        legend: {
          display: true
        }
        ,
         plugins: {
					datalabels: {
						
						display: function(context) {
							return context.dataset.data[context.dataIndex] > 15;
						},
						formatter: Math.round
					}
				},
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
ngOnDestroy() {
  this.dataCompined.unsubscribe();
  
}
}
