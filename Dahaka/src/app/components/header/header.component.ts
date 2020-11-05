import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { Router } from '@angular/router';

import { TimesheetComponent } from '../timesheet/timesheet.component';
import { AdminComponent } from '../admin/admin.component';
import { ReportComponent } from '../report/report.component';
import { VacationComponent } from '../vacation/vacation.component';
import { RecognitionComponent } from '../recognition/recognition.component';
import { DataService } from 'src/app/service/common/data.service';

import * as _moment from 'moment';

export const Header_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: Header_FORMATS},
  ],
})
export class HeaderComponent implements OnInit {

  mode = new FormControl('over');

  spinnerValue: boolean;

  userName: string = null;

  //message = 'Hola Mundo!';
  startOfMonth;
  endOfMonth;

  @Output() messageEvent = new EventEmitter<string>();

  // sendMessage() {
  //   this.messageEvent.emit(this.startOfMonth)
  // }

  @Output() searchEvent = new EventEmitter<string>();

  headerFilterEvent(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.searchEvent.emit(filterValue);
  }

  selectedDate = new FormControl(_moment(), Validators.required);

  constructor(private router: Router, private data: DataService) { }

  ngDoCheck(): void {
    this.userName = sessionStorage.getItem("userName");
  }

  ngOnInit(): void {
    this.data.sprinnerValue.subscribe(_spinnerValue => this.spinnerValue = _spinnerValue)
    this.userName = sessionStorage.getItem("userName");
  }

  //logout function
  logout() {
    //sessionStorage.removeItem("userid");
    sessionStorage.clear();
      this.router.navigate(['/login'])
  }

  //to implement date
  onMonthSelection() {
    //console.log(this.selectedDate.value.format("MM-DD-YYYY"));

    this.startOfMonth = this.selectedDate.value.startOf('month').unix();
    this.endOfMonth = this.selectedDate.value.endOf('month').unix();
    
    this.messageEvent.emit(this.startOfMonth+' '+this.endOfMonth);

    console.log("start of month" + this.startOfMonth);
    console.log("end of month" + this.endOfMonth);
  }
}
