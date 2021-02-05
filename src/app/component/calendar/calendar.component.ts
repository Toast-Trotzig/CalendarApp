import { Component, OnInit } from '@angular/core';
import {IDay, IMeeting, ITimestamp} from '../Models/model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {



  timestamps: ITimestamp[] = [
    {time: '06.00', meeting: null}, {time: '06.15', meeting: null}, {time: '06.30', meeting: null}, {time: '06.45', meeting: null},
    {time: '07.00', meeting: null}, {time: '07.15', meeting: null}, {time: '07.30', meeting: null}, {time: '07.45', meeting: null},
    {time: '08.00', meeting: null}, {time: '08.15', meeting: null}, {time: '08.30', meeting: null}, {time: '08.45', meeting: null},
    {time: '09.00', meeting: null}, {time: '09.15', meeting: null}, {time: '09.30', meeting: null}, {time: '09.45', meeting: null},
    {time: '10.00', meeting: null}, {time: '10.15', meeting: null}, {time: '10.30', meeting: null}, {time: '10.45', meeting: null},
    {time: '11.00', meeting: null}, {time: '11.15', meeting: null}, {time: '11.30', meeting: null}, {time: '11.45', meeting: null},
    {time: '12.00', meeting: null}, {time: '12.15', meeting: null}, {time: '12.30', meeting: null}, {time: '12.45', meeting: null},
    {time: '13.00', meeting: null}, {time: '13.15', meeting: null}, {time: '13.30', meeting: null}, {time: '13.45', meeting: null},
    {time: '14.00', meeting: null}, {time: '14.15', meeting: null}, {time: '14.30', meeting: null}, {time: '14.45', meeting: null},
    {time: '15.00', meeting: null}, {time: '15.15', meeting: null}, {time: '15.30', meeting: null}, {time: '15.45', meeting: null},
    {time: '16.00', meeting: null}, {time: '16.15', meeting: null}, {time: '16.30', meeting: null}, {time: '16.45', meeting: null},
    {time: '17.00', meeting: null}, {time: '17.15', meeting: null}, {time: '17.30', meeting: null}, {time: '17.45', meeting: null},
    {time: '18.00', meeting: null}, {time: '18.15', meeting: null}, {time: '18.30', meeting: null}, {time: '18.45', meeting: null},
    {time: '19.00', meeting: null}, {time: '19.15', meeting: null}, {time: '19.30', meeting: null}, {time: '19.45', meeting: null},
    {time: '20.00', meeting: null}, {time: '20.15', meeting: null}, {time: '20.30', meeting: null}, {time: '20.45', meeting: null},
    {time: '21.00', meeting: null}, {time: '21.15', meeting: null}, {time: '21.30', meeting: null}, {time: '21.45', meeting: null},
    {time: '22.00', meeting: null}, {time: '22.15', meeting: null}, {time: '22.30', meeting: null}, {time: '22.45', meeting: null}
  ];

  filteredtimes: ITimestamp[];
  days: IDay[] = [];
  meeting: IMeeting = {name: null, multiplier: null};

  tempday: IDay = {date: null, timestamp: []};
  today: Date = new Date();
  week: IDay[];
  startindex = 0;
  endindex = 7;



  constructor() { }


  ngOnInit(): void {
    this.filteredtimes = this.timestamps.filter((x, i) => i % 2 === 0);
    console.log(this.filteredtimes);
    const today = new Date();
    this.tempday.date = today;
    console.log(today);
    const fday = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
    const date = new Date(today.setDate(fday));
    const testmeeting = Object.assign({}, this.meeting);
    const tstmeeting = Object.assign({}, this.meeting);
    const nextweekmeeting = Object.assign({}, this.meeting);

    for (let i = 0; i < 29; i++) {
      const tmp = JSON.parse(JSON.stringify(this.timestamps));
      const temp = Object.assign({}, this.tempday);
      temp.timestamp = tmp;
      temp.date = new Date(temp.date.setDate(date.getDate() + i));
      this.days.push(temp);
    }

    testmeeting.name = 'test';
    testmeeting.multiplier = 2;
    this.days[2].timestamp[14].meeting = testmeeting;
    tstmeeting.name = 'Good morning';
    tstmeeting.multiplier = 1;
    this.days[4].timestamp[6].meeting = tstmeeting;
    nextweekmeeting.name = 'Meeting';
    nextweekmeeting.multiplier = 4;
    this.days[12].timestamp[22].meeting = nextweekmeeting;

    this.week = this.days.slice(this.startindex, this.endindex);
  }

  onTodayClick(): void {
    this.startindex = 0;
    this.endindex = 7;
    this.week = this.days.slice(this.startindex, this.endindex);
  }

  onBackClick(): void {
    if (this.startindex !== 0) {
      this.startindex = this.startindex - 7;
      this.endindex = this.endindex - 7;
      this.week = this.days.slice(this.startindex, this.endindex);
    }
  }

  onForwardClick(): void {
    if (this.endindex < 28) {
      this.startindex = this.startindex + 7;
      this.endindex = this.endindex + 7;
      this.week = this.days.slice(this.startindex, this.endindex);
    }
  }

}
