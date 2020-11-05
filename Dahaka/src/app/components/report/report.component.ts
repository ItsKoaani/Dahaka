import { Component, OnInit } from '@angular/core';
import {ExportExcelService } from '../../service/excel/export-excel.service';

import { CrudService } from '../../service/crud.service';

export interface ITeamReportSelect {
  reportName: string;
}

export interface IIndividualReportSelect {
  reportName: string;
}

export interface IUserDetailsSummary {
  srAssignee: string,
  srDesc: string,
  srGroup: string,
  srNumber: string,
  srPriority: string,
  srStatus: string
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  tablElementData: IUserDetailsSummary[] = [];

  teamReportSelect: ITeamReportSelect[] = [
    {reportName: 'SR list'},
    {reportName: 'Timesheet'}
  ];
  
  individualReportSelect:  IIndividualReportSelect[] = [
    {reportName: 'SR list'},
    {reportName: 'Timesheet'}
  ];

  selectedTeamReport: string;

  selectedIndividualReport: string;

  ngOnInit(): void {

    this.crudService.getAllSrList().subscribe(data => {
      this.tablElementData = data.map(item => {
        return {
          srAssignee: item['srAssignee'],
          srDesc: item['srDesc'],
          srGroup: item['srGroup'],
          srPriority: item['srPriority'],
          srNumber: item['srNumber'],
          srStatus: item['srStatus']
        }
      })
      console.log(this.tablElementData);
    })
  }

  title = 'Time Sheet Details';

  dataForExcel = [];

  constructor(public ete: ExportExcelService, public crudService: CrudService) { }

  exportToExcel() {
      this.tablElementData.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Timesheet Details',
      data: this.dataForExcel,
      headers: Object.keys(this.tablElementData[0])
    }

      this.ete.exportExcel(reportData);
  }

}
