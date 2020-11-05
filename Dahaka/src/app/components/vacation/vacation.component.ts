import { Component, OnInit, ViewChild } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';
import * as moment from 'moment';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface IUserDetailsSummary {
  assignee: string,
  comments: string,
  effortHours: string,
  endDate: string,
  request: string,
  startDate: string,
  srStatus: string
}

@Component({
  selector: 'vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  userid: any = null;
  dataSource: any;
  tablElementData: IUserDetailsSummary[] = [];

  displayedColumns: string[] = ['startDate', 'endDate', 'assignee', 'effortHours', 'comments'];

  constructor(public crudService: CrudService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.crudService.getUserVacation().subscribe(data => {
      this.tablElementData = data.map(item => {
        //console.log(item);
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
      //console.log(this.dataSource);
    })
    
  }

}
