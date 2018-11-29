import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

 
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: any[] = [];
  private title:string ='';
  public add(message: any) {
    this.messages.push(message);
  }

  public isOnline(){
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
  }
public  clear() {
    this.messages = [];
  }

  public setTitle(t:string) {
    this.title = t;
  }

  public getTitle() {
    return this.title;
  }
}

