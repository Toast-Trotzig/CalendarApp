import { Component, OnInit } from '@angular/core';
import {IDay, IMeeting, ITimestamp} from '../Models/model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {



  timestamps: ITimestamp[] = [{time: '09.00', meeting: null}, {time: '10.00', meeting: null}, {time: '11.00', meeting: null}, {time: '12.00', meeting: null},
    {time: '13.00', meeting: null}, {time: '14.00', meeting: null}, {time: '15.00', meeting: null}, {time: '16.00', meeting: null}, {time: '17.00', meeting: null},
    {time: '18.00', meeting: null}, {time: '19.00', meeting: null}, {time: '20.00', meeting: null}, {time: '21.00', meeting: null}, {time: '22.00', meeting: null}, ];
  days: IDay[] = [];
  meeting: IMeeting = {name: null, multiplier: null};

  tempday: IDay = {date: null, timestamp: []};



  constructor() { }


  ngOnInit(): void {
    const today = new Date();
    this.tempday.date = today;
    const date = new Date();
    const testmeeting = Object.assign({}, this.meeting);
    testmeeting.name = 'test';
    testmeeting.multiplier = 2;

    for (let i = 0; i < 8; i++) {
      const tmp = Object.assign([], this.timestamps);
      const temp = Object.assign({}, this.tempday);
      console.log(tmp);
      temp.timestamp = tmp;
      this.days.push(temp);
      temp.date = new Date(temp.date.setDate(date.getDate() + i));
      console.log(temp.date);
    }
    this.days[2].timestamp[8].meeting = testmeeting;
    console.log(this.days);
  }

}
