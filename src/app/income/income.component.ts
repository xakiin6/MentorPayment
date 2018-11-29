import { Component, OnInit,Output, AfterViewInit } from '@angular/core';
import {PaymentsService} from './../payments.service';
import {MessageService} from './../message.service';
import { Chart } from 'chart.js';
import   'chartjs-plugin-datalabels';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(public pService:PaymentsService,private mService:MessageService) { }
  title="Income summary";
  listSummary=0;
  Lists:any[] =[];
charts:any[] =[];
  ngOnInit() {
    
    
    let total = this.pService.getReviewsSum().concat(this.pService.getClassSum());
    this.listSummary = total.reduce((a:any,b:any)=> {
      let d = a+(b || 0);
      
      return d; 
    });
   var csum = this.pService.getClassSum();
   var lst= this.pService.getReviewsSum().map(function (num, idx) {
      return  num + (csum[idx] || 0);
    });

    this.Lists = lst;
    setTimeout(() => {
this.initChart();
this.mService.setTitle(this.title);    
});
    
  }

  initChart(){
    
    let chartCanvas= window.document.querySelector('#chartCanvas');
    var color = Chart.helpers.color;
    var chartColors = {
     red: 'rgb(255, 99, 132)',
     orange: 'rgb(255, 159, 64)',
     yellow: 'rgb(255, 205, 86)',
     green: 'rgb(75, 192, 192)',
     blue: 'rgb(54, 162, 235)',
     purple: '#4b00d1',
     grey: 'rgb(201, 203, 207)'
   };
   
   this.charts = new Chart(chartCanvas, {
       type: 'horizontalBar',
       data: {
         datasets: [{
               label: 'INCOME PER MONTH',
               data: this.Lists,
               backgroundColor: [
                
                color(chartColors.grey).alpha(0.5).rgbString(),
                
                ],
                borderWidth: 4,fill:'false',steppedLine:'before',
                borderColor:chartColors.grey,
                
                datalabels: {
                  
                  margin: {left:10},
                  align: 'top',
                  anchor: 'end',
                  backgroundColor: color(chartColors.red).alpha(0.9).rgbString(),
                  borderRadius:100,
                  borderWidth: 1,
                  color: '#fff'
                }
            
             }],
         labels: this.pService.getMonthLabels()
       },
       options: {
         responsive:true,
         maintainAspectRatio:true,
         legend: {
           display: true
         },
         plugins: {
					datalabels: {
						color: 'white',
						display: function(context) {
							return context.dataset.data[context.dataIndex] > 15;
						},
						font: {
							weight: 'bold'
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
  
}
