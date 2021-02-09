export interface IDay {

  date: Date;
  timestamp: ITimestamp[];
}

export interface ITimestamp {
  time: string;
  meeting: IMeeting[];
}

export interface IMeeting {

  multiplier: number;
  name: string;
}

export interface IDialogdata {
  name: string;
  date: Date;
  time: string;
  length: number;
}
