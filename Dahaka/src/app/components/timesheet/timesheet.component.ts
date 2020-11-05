import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl } from '@angular/forms';

import * as moment from 'moment';
import { DataService } from 'src/app/service/common/data.service';

export interface IUserDetailsSummary {
  assignee: string,
  comments: string,
  effortHours: string,
  endDate: string,
  request: string,
  startDate: string,
  srStatus: string
}

export interface srDetail {
  srNumber: string,
  desc: string
}

export interface ppmDetails {
  ppmNumber: string,
  ppmDesc: string
}

export interface catwDetails {
  catwNumber: string,
  catwDesc: string
}

@Component({
  selector: 'timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

export class TimesheetComponent implements OnInit {

  mode = new FormControl('over');

  control: AbstractControl = null;
  timeSheetForm: FormGroup;
  today = new Date();
  submitted = false;

  message:string;
  startOfMonth: String;
  endOfMonth: String;

  statusList: string[] = ['Work/Fix In Progress', 'Open', 'Closed', 'Resolved Pending Confirmation',
    'Pend WCDS Feedback', 'On hold Pend customer', 'CC Transaltion'];

  ppmList: ppmDetails[] = [];
  catwList: catwDetails[] = [];
  srDetailList: srDetail[] = [];
  resource: string = null;

  username: string;
  // pin: string;

  displayedColumns: string[] = ['startDate', 'endDate', 'request', 'srStatus', 'assignee', 'effortHours', 'comments'];

  dataSource: any;

  tablElementData: IUserDetailsSummary[] = [];

  spinnerValue: boolean = false;

  currentUser: Promise<String>;

  constructor(public crudService: CrudService, private formBuilder: FormBuilder, private data: DataService) { 
    //this.currentUser = sessionStorage.getItem("userName");
  }

  ngDoCheck(): void {

    if (this.timeSheetForm.controls.fcSelectedCatwValue.value != null) {
      if ((this.timeSheetForm.controls.fcSelectedCatwValue.value['catwNumber'] == "01010110")
        ||
        (this.timeSheetForm.controls.fcSelectedCatwValue.value['catwNumber'] == "01010100")) {

        this.timeSheetForm.controls.fcSelectedSrStatusValue.clearValidators();
        this.timeSheetForm.controls.fcSelectedSrStatusValue.reset();

        this.timeSheetForm.controls.fcPpmDefect.clearValidators();
        this.timeSheetForm.controls.fcPpmDefect.reset();

        this.timeSheetForm.controls.fcWorkPackage.clearValidators();
        this.timeSheetForm.controls.fcWorkPackage.reset();

        this.timeSheetForm.controls.fcProposal.clearValidators();
        this.timeSheetForm.controls.fcProposal.reset();

        this.timeSheetForm.controls.fcTdr.clearValidators();
        this.timeSheetForm.controls.fcTdr.reset();
      }
    }

    if (this.timeSheetForm.controls.fcSelectedPpmValue.value != null) {
      if ((this.timeSheetForm.controls.fcSelectedPpmValue.value['ppmNumber'] == "01110110")
        || (this.timeSheetForm.controls.fcSelectedPpmValue.value['ppmNumber'] == "01110100")) {

        this.timeSheetForm.controls.fcSelectedSrStatusValue.clearValidators();
        this.timeSheetForm.controls.fcSelectedSrStatusValue.reset();

        this.timeSheetForm.controls.fcPpmDefect.clearValidators();
        this.timeSheetForm.controls.fcPpmDefect.reset();

        this.timeSheetForm.controls.fcWorkPackage.clearValidators();
        this.timeSheetForm.controls.fcWorkPackage.reset();

        this.timeSheetForm.controls.fcProposal.clearValidators();
        this.timeSheetForm.controls.fcProposal.reset();

        this.timeSheetForm.controls.fcTdr.clearValidators();
        this.timeSheetForm.controls.fcTdr.reset();
      }
    }

    this.timeSheetForm.controls.fcAssignee.setValue(sessionStorage.getItem("userName"));
    //console.log(this.timeSheetForm.controls.fcAssignee.value);
    this.timeSheetForm.controls.fcAssignee.disable();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  receiveMessage($event) {
    //console.log(this.message);
    this.message = $event.split(" ");
    this.startOfMonth = this.message[0];
    this.endOfMonth = this.message[1];

    this.loadTimeSheeet("R, Anandan", Number(this.startOfMonth), Number(this.endOfMonth));
  }

  ngOnInit() {

    //console.log("On init");
    //to set spinner on db subcribe
    this.data.sprinnerValue.subscribe(_spinnerValue => this.spinnerValue = _spinnerValue)
    this.data.changeSpinnerValue(true);

    this.timeSheetForm = this.formBuilder.group({
      fcStartDate: [, [Validators.required]],
      fcEndDate: [, [Validators.required]],
      fcEffort: ['', [Validators.required]],
      fcSelectedTicketValue: ['', [Validators.required]],
      fcSelectedSrStatusValue: ['', [Validators.required]],
      fcSelectedPpmValue: ['', [Validators.required]],
      fcSelectedCatwValue: ['', [Validators.required]],
      //fcSelectedCatwValue: new FormControl ({ value: "" }, Validators.required),
      fcAssignee: ['', [Validators.required]],
      fcPpmDefect: [''],
      fcProposal: [''],
      fcWorkPackage: [''],
      fcTdr: [''],
      fcComment: ['', [Validators.required]]
    });

    //this.crudService.getAllUserSummaryDetail().subscribe(data => {
    //to get current user data to the timesheet table
    //console.log(this.timeSheetForm.controls.fcAssignee.value);
    //this.loadTimeSheeet("R, Anandan", ,);
    //this.loadTimeSheeet()

    this.crudService.getAllSrList().subscribe(data => {
      this.srDetailList = data.map(item => {
        return {
          srNumber: item['srNumber'],
          desc: item['srDesc'],
        }
      })
    })

    this.crudService.getAllPpm().subscribe(data => {
      this.ppmList = data.map(item => {
        return {
          ppmNumber: item['ppmNumber'],
          ppmDesc: item['ppmDesc'],
        }
      })
    })

    this.crudService.getAllCatw().subscribe(data => {
      //console.log(data)
      this.catwList = data.map(item => {
        return {
          catwNumber: item['catwNumber'],
          catwDesc: item['catwDesc'],
        }
      })
    })

    this.data.changeSpinnerValue(false);
  }

  get f() { return this.timeSheetForm.controls; }

  onSave() {
    console.log("on save");
    this.submitted = true;

    if (this.timeSheetForm.invalid) { return; }

    let record = {};
    
    record['startDate'] = this.f.fcStartDate.value;
    record['endDate'] = this.f.fcEndDate.value;
    record['request'] = this.f.fcSelectedTicketValue.value['srNumber'];
    record['effortHours'] = this.f.fcEffort.value;
    record['ppmNumber'] = this.f.fcSelectedPpmValue.value['ppmNumber'];
    record['ppmDefect'] = this.f.fcPpmDefect.value;
    record['assignee'] = this.f.fcAssignee.value;
    record['catwNumber'] = this.f.fcSelectedCatwValue.value['catwNumber'];
    record['proposal'] = this.f.fcProposal.value;
    record['tdr'] = this.f.fcTdr.value;
    record['workPackage'] = this.f.fcWorkPackage.value;
    record['srStatus'] = this.f.fcSelectedSrStatusValue.value;
    record['comments'] = this.f.fcComment.value;

    this.crudService.insertUserSummaryDetails(record).then(res => {
      console.log("insert success");
    });

    this.onReset();
  }


  onReset() {
    console.log("on reset");
    this.submitted = false;

    //this.timeSheetForm.markAsPristine();
    this.timeSheetForm.reset();
    this.timeSheetForm.markAsUntouched();

    Object.keys(this.timeSheetForm.controls).forEach((name) => {
      this.control = this.timeSheetForm.controls[name];
      this.control.setErrors(null);
    });
  }

  loadTimeSheeet(pCurrentUser, pStartMonth, pEndMonth){
    //console.log(pCurrentUser +"  "+ pStartMonth+"  "+pEndMonth);
    this.crudService.getCurrentUserSummaryDetail(pCurrentUser, pStartMonth, pEndMonth).subscribe(data => {
      this.data.changeSpinnerValue(true);
      this.tablElementData = data.map(item => {

        return {
          assignee: item['assignee'],
          comments: item['comments'],
          effortHours: item['effortHours'],
          endDate: moment.unix(item['endDate']['seconds']).format('MM/DD/YYYY'),
          request: item['request'],
          startDate: moment.unix(item['startDate']['seconds']).format('MM/DD/YYYY'),
          srStatus: item['srStatus']
        }
      })

      this.dataSource = new MatTableDataSource<IUserDetailsSummary>(this.tablElementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.data.changeSpinnerValue(false);
    })
  }

}