import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  constructor(public messageService: MessageService,public domSanitizer: DomSanitizer) {}

  ngOnInit() {
  
  }

}
