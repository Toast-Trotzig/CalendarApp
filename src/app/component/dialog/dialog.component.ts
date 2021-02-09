import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDialogdata} from '../Models/model';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  eventForm = this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    length: ['', Validators.required]
  });

  timestamps: string[] = ['06.00', '06.15', '06.30', '06.45', '07.00', '07.15', '07.30', '07.45', '08.00', '08.15', '08.30', '08.45',
    '09.00', '09.15', '09.30', '09.45', '10.00', '10.15', '10.30', '10.45', '11.00', '11.15', '11.30', '11.45', '12.00', '12.15', '12.30', '12.45',
    '13.00', '13.15', '13.30', '13.45', '14.00', '14.15', '14.30', '14.45', '15.00', '15.15', '15.30', '15.45', '16.00', '16.15', '16.30', '16.45',
    '17.00', '17.15', '17.30', '17.45', '18.00', '18.15', '18.30', '18.45', '19.00', '19.15', '19.30', '19.45', '20.00', '20.15', '20.30', '20.45',
    '21.00', '21.15', '21.30', '21.45', '22.00', '22.15', '22.30', '22.45'];
  minDate: Date;
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogdata,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  const today = new Date();
  const fdate = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
  this.minDate = new Date(today.setDate(fdate));
  this.maxDate = new Date(today.setDate(fdate + 27));
  }

  onSubmit(): void {
    this.data.name = this.eventForm.value.name;
    this.data.date = this.eventForm.value.date;
    this.data.time = this.eventForm.value.time;
    this.data.length = this.eventForm.value.length;
    this.dialogRef.close(this.data);

  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

}
