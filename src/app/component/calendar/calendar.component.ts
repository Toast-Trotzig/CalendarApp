import {Component, OnInit} from '@angular/core';
import {IDay, IMeeting, ITimestamp} from '../Models/model';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  timestamps: ITimestamp[] = [
    {time: '06.00', meeting: []}, {time: '06.15', meeting: []}, {time: '06.30', meeting: []}, {time: '06.45', meeting: []},
    {time: '07.00', meeting: []}, {time: '07.15', meeting: []}, {time: '07.30', meeting: []}, {time: '07.45', meeting: []},
    {time: '08.00', meeting: []}, {time: '08.15', meeting: []}, {time: '08.30', meeting: []}, {time: '08.45', meeting: []},
    {time: '09.00', meeting: []}, {time: '09.15', meeting: []}, {time: '09.30', meeting: []}, {time: '09.45', meeting: []},
    {time: '10.00', meeting: []}, {time: '10.15', meeting: []}, {time: '10.30', meeting: []}, {time: '10.45', meeting: []},
    {time: '11.00', meeting: []}, {time: '11.15', meeting: []}, {time: '11.30', meeting: []}, {time: '11.45', meeting: []},
    {time: '12.00', meeting: []}, {time: '12.15', meeting: []}, {time: '12.30', meeting: []}, {time: '12.45', meeting: []},
    {time: '13.00', meeting: []}, {time: '13.15', meeting: []}, {time: '13.30', meeting: []}, {time: '13.45', meeting: []},
    {time: '14.00', meeting: []}, {time: '14.15', meeting: []}, {time: '14.30', meeting: []}, {time: '14.45', meeting: []},
    {time: '15.00', meeting: []}, {time: '15.15', meeting: []}, {time: '15.30', meeting: []}, {time: '15.45', meeting: []},
    {time: '16.00', meeting: []}, {time: '16.15', meeting: []}, {time: '16.30', meeting: []}, {time: '16.45', meeting: []},
    {time: '17.00', meeting: []}, {time: '17.15', meeting: []}, {time: '17.30', meeting: []}, {time: '17.45', meeting: []},
    {time: '18.00', meeting: []}, {time: '18.15', meeting: []}, {time: '18.30', meeting: []}, {time: '18.45', meeting: []},
    {time: '19.00', meeting: []}, {time: '19.15', meeting: []}, {time: '19.30', meeting: []}, {time: '19.45', meeting: []},
    {time: '20.00', meeting: []}, {time: '20.15', meeting: []}, {time: '20.30', meeting: []}, {time: '20.45', meeting: []},
    {time: '21.00', meeting: []}, {time: '21.15', meeting: []}, {time: '21.30', meeting: []}, {time: '21.45', meeting: []},
    {time: '22.00', meeting: []}, {time: '22.15', meeting: []}, {time: '22.30', meeting: []}, {time: '22.45', meeting: []}
  ];

  filteredtimes: ITimestamp[];
  days: IDay[] = [];
  meeting: IMeeting = {name: null, multiplier: null};
  tempday: IDay = {date: null, timestamp: []};
  today: Date = new Date();
  week: IDay[];
  startindex = 0;
  endindex = 7;


  constructor(public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.filteredtimes = this.timestamps.filter((x, i) => i % 2 === 0);
    const today = new Date();
    const fday = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
    let date = new Date(today.setDate(fday - 1));
    const lastdate = new Date();
    lastdate.setDate(date.getDate() + 27);
    const testmeeting = Object.assign({}, this.meeting);
    const tstmeeting = Object.assign({}, this.meeting);
    const nextweekmeeting = Object.assign({}, this.meeting);
    const meeting = Object.assign({}, this.meeting);

    while (date <= lastdate) {
      const tmp = JSON.parse(JSON.stringify(this.timestamps));
      const temp = Object.assign({}, this.tempday);
      temp.timestamp = tmp;
      temp.date = date;
      this.days.push(temp);
      date = new Date(date.setDate(date.getDate() + 1));
    }

    console.log(this.days);
    testmeeting.name = 'test';
    testmeeting.multiplier = 2;
    this.days[2].timestamp[14].meeting[0] = testmeeting;
    tstmeeting.name = 'Good morning';
    tstmeeting.multiplier = 1;
    this.days[4].timestamp[6].meeting[0] = tstmeeting;
    nextweekmeeting.name = 'Meeting';
    nextweekmeeting.multiplier = 3;
    this.days[11].timestamp[22].meeting[0] = nextweekmeeting;
    meeting.name = 'test 2';
    meeting.multiplier = 1;
    this.days[2].timestamp[14].meeting[1] = meeting;

    for (const day of this.days) {
      for (const time of day.timestamp) {
        time.meeting.sort((a, b) => a.multiplier - b.multiplier);
      }
    }


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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {name: null, date: null, time: null, length: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      const tempmeeting = Object.assign({}, this.meeting);
      if (result !== null) {
        tempmeeting.name = result.name;
        tempmeeting.multiplier = result.length;
        this.days.find(x => x.date.toDateString() === result.date.toDateString()).timestamp.find(x => x.time === result.time).meeting.push(tempmeeting);
      }
    });
  }

  amountPreviousMeetings(day: IDay, timestamp: ITimestamp): number {

    let amount = 0;
    const index = day.timestamp.findIndex(x => x.time === timestamp.time);

    for (let i = 8; i > 0; i--) {
      const currentindex = index - i;
      const time = day.timestamp[currentindex];
      let boo = 0;
      if (currentindex >= 0 && time.meeting.length > 0) {
        for (const tmp of time.meeting) {
          if (tmp.multiplier > i && tmp.multiplier !== 1) {
            boo = boo + 1;
          }
        }
        if (boo > 0) {
          amount = amount + time.meeting.length;
        }
      }
    }
    return amount;
  }

  amountLaterMeetings(day: IDay, timestamp: ITimestamp): number {
    let amount = 0;
    const index = day.timestamp.findIndex(x => x.time === timestamp.time);


    for (let i = 1; i < 9; i++) {
      const currentindex = index + i;
      const time = day.timestamp[currentindex];
      if (currentindex < 68 && time.meeting.length > 0) {
        for (const temp of timestamp.meeting) {
          if (temp.multiplier > i) {
            for (const tmp of time.meeting) {
              amount = amount + 1;
            }
          }
        }
      }
    }

    return amount;
  }

  checkPreviousMeetings(day: IDay, timestamp: ITimestamp): boolean {
    if (this.amountPreviousMeetings(day, timestamp) !== 0) {
      return true;
    } else {
      return false;
    }
  }

  checkLaterMeetings(day: IDay, timestamp: ITimestamp): boolean {
    if (this.amountLaterMeetings(day, timestamp) !== 0) {
      return true;
    } else {
      return false;
    }
  }
}
