import { Component, OnInit } from '@angular/core';
import {IDay, IMeeting, ITimestamp} from '../Models/model';
import {DatePipe} from '@angular/common';

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
  today: Date = new Date();



  constructor(public datepipe: DatePipe) { }


  ngOnInit(): void {
    const today = new Date();
    this.tempday.date = today;
    console.log(today);
    const fday = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
    const date = new Date(today.setDate(fday));
    const testmeeting = Object.assign({}, this.meeting);
    const tstmeeting = Object.assign({}, this.meeting);

    for (let i = 0; i < 8; i++) {
      const tmp = JSON.parse(JSON.stringify(this.timestamps));
      const temp = Object.assign({}, this.tempday);
      temp.timestamp = tmp;
      temp.date = new Date(temp.date.setDate(date.getDate() + i));
      this.days.push(temp);
    }

    testmeeting.name = 'test';
    testmeeting.multiplier = 2;
    this.days[2].timestamp[8].meeting = testmeeting;
    tstmeeting.name = 'Good morning';
    tstmeeting.multiplier = 1;
    this.days[4].timestamp[0].meeting = tstmeeting;
    console.log(this.days);
  }

}
