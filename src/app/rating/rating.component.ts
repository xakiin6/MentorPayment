import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit,AfterViewInit {
  stars = [1,2,3,4,5];
  Rating =[];
  data=[];
  alldata=[];
 rawdata=[{"updated_at":"2018-07-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-07-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-07-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-07-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-07-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":3,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-06-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":3,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-05-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":3,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-04-30T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":2,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":4,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1},{"updated_at":"2018-03-31T23:00:00.000Z","rating":5,"total":1}]
  title = 'Ratings';
  constructor(private mService:MessageService) { }

  ngOnInit() {
    
    this.conbineData();
   
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.mService.setTitle(this.title);
      });
  }
 conbineData(){
 this.alldata= this.alldata.concat(this.rawdata);
 
this.Rating  = this.alldata.reduce(function(res, obj) {
  if (!((new Date(obj.updated_at).getMonth()+1) in res))
      res.__array.push(res[(new Date(obj.updated_at).getMonth()+1)] = obj);
  else {
      res[(new Date(obj.updated_at).getMonth()+1)].rating += obj.rating;
      res[(new Date(obj.updated_at).getMonth()+1)].total += obj.total;

      
  }
  return res;
}, {__array:[]}).__array
              .sort(function(a,b) { return b.updated_at - a.updated_at; });


            }
           
                }
  


