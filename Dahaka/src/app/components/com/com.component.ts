import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormControl, Validators} from '@angular/forms';

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

export interface srStatus {
  srStatus: string
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
  selector: 'app-com',
  templateUrl: './com.component.html',
  styleUrls: ['./com.component.css']
})

export class ComComponent implements OnInit {

  fcStartDate = new FormControl(new Date());
  fcEndDate = new FormControl(new Date());
  
  fcEffort = new FormControl();  
  fcSelectedTicketValue = new FormControl();
  fcSelectedSrStatusValue = new FormControl();
  fcSelectedPpmValue = new FormControl();
  fcSelectedCatwValue = new FormControl();
  fcAsignee = new FormControl();
  fcPpmDefect = new FormControl();
  fcProposal = new FormControl();
  fcWorkPackage = new FormControl();
  fcTdr = new FormControl();
  fcComment = new FormControl();


  selectFormControl = new FormControl('', Validators.required);
  
  srDetailList: srDetail[] = [];

  srStatusList: srStatus[] = [];

  ppmList: ppmDetails[] = [];

  catwList: catwDetails[] = [];

  username: string;
  pin: string;
  mode = new FormControl('over');

  displayedColumns: string[] = ['startDate', 'endDate', 'request', 'srStatus', 'assignee', 'effortHours', 'comments'];

  tablElementData: IUserDetailsSummary[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getAllUserSummaryDetail().subscribe(data => {
      this.tablElementData = data.map(item => {
        return {
          assignee: item['assignee'],
          comments: item['comments'],
          effortHours: item['effortHours'],
          endDate: item['endDate'],
          request: item['request'],
          startDate: item['startDate'],
          srStatus: item['srStatus']
        }
      })
    })

    this.crudService.getAllSrDetail().subscribe(data => {
      this.srDetailList = data.map(item => {
        return {
          srNumber: item['srNumber'],
          desc: item['desc'],
        }
      })
    })

    this.crudService.getAllStatus().subscribe(data => {
      this.srStatusList = data.map(item => {
        return {
          srStatus: item['status'],
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
  }

  onSave(){
    console.table([this.fcStartDate, this.fcEndDate,
      this.fcSelectedSrStatusValue.value, this.fcEffort.value, this.fcSelectedTicketValue.value['srNumber'],
      this.fcSelectedPpmValue.value, this.fcPpmDefect.value, this.fcAsignee.value, this.fcComment.value,
      this.fcSelectedCatwValue.value, this.fcProposal.value, this.fcTdr.value, this.fcWorkPackage.value
    ]);

    let record = {};

    record['request'] = this.fcSelectedTicketValue.value['srNumber'];
    record['effortHours'] = this.fcEffort.value;
    record['ppmDefect'] = this.fcSelectedPpmValue.value['ppmNumber'];
    record['ppmDefect'] = this.fcPpmDefect.value;
    record['assignee'] = this.fcAsignee.value;
    record['catwNumber'] = this.fcSelectedCatwValue.value['catwNumber'];
    record['proposal'] = this.fcProposal.value;
    record['tdr'] = this.fcTdr.value;
    record['workPackage'] = this.fcWorkPackage.value;
    record['srStatus'] = this.fcSelectedSrStatusValue.value['srStatus'];
    record['comments'] = this.fcComment.value;

    this.crudService.insertUserSummaryDetails(record).then(res => {
      console.log("insert demo success");
    });

  }
}