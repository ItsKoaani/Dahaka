import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/common/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { I_RECOGNITION } from '../../interface/model';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';

import {defaultFormat as _rollupMoment} from 'moment';
import { HeaderComponent } from '../header/header.component';

const moment = _rollupMoment || _moment;


/**
 * @author Koaani <koaani92@gmail.com>
 * @version 0.1
 * 
 * RecognitionComponent is created to add and view users appreciation emails and awards
 */
@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.css'],
})
export class RecognitionComponent implements OnInit {

  selectedDate = new FormControl(_moment(), Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  message:string;
  startOfMonth;
  endOfMonth;

  receiveMessage($event) {
    this.message = $event.split(" ");
    this.startOfMonth = this.message[0];
    this.endOfMonth = this.message[1];

    this.onMonthSelection(Number(this.startOfMonth), Number(this.endOfMonth));
  }

  applyFilter($event) {
    const filterValue = $event;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  recognitionTableData: I_RECOGNITION[] = [];
  
  displayedColumns: string[] = ['date', 'name', 'from', 'subject', 'content'];

  dataSource: MatTableDataSource<I_RECOGNITION>;

  emailInputFormGroup: FormGroup;
  
  //for spinner on load
  spinnerValue: boolean = false;

  constructor(public crudService: CrudService, private data: DataService, private formBuilder: FormBuilder
    , private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    //to set spinner on load
    this.data.sprinnerValue.subscribe(_spinnerValue => this.spinnerValue = _spinnerValue)
    this.data.changeSpinnerValue(true);

    //console.log(this.selectedDate.value.unix());
    // let qDate = this.selectedDate.value.unix()

    let startOfMonth = this.selectedDate.value.startOf('month').unix();
    let endOfMonth = this.selectedDate.value.endOf('month').unix();
    //console.log("start of month is "+startOfMonth+" ENd of month is "+endOfMonth);

    //console.log(this.selectedDate.value.format("MM-DD-YYYY"));
    //let qDate = _moment.unix(this.selectedDate.value.format("MM-DD-YYYY"));
    //let qDate = this.selectedDate.value.format("MM-DD-YYYY").unix;
    //to load  table data from db
    // this.crudService.getAllRecognitionForThisUser(startOfMonth, endOfMonth).subscribe(data => {
    //   this.data.changeSpinnerValue(true);
      
    //   this.recognitionTableData = data.map(item => {
    //     return {
    //       content: item['CONTENT'],
    //       from: item['FROM'],
    //       name: item['NAME'],
    //       subject: item['SUBJECT'],
    //       date: _moment.unix(item['DATE']['seconds']).format('MM/DD/YYYY')
    //     }
    //   })
    //   this.dataSource = new MatTableDataSource<I_RECOGNITION>(this.recognitionTableData); 
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.data.changeSpinnerValue(false);
    // })
    //this.data.changeSpinnerValue(false);
    this.onMonthSelection(startOfMonth, endOfMonth);

    //setting up to get inputs for appreciation emails
    this.emailInputFormGroup = this.formBuilder.group({
      fgDate: [ , Validators.required],
      fgName: ["", Validators.required],
      fgFrom: ["", Validators.required],
      fgSubject: ["", Validators.required],
      fgContent: ["", Validators.required]
    })
    
  }


  onMonthSelection(pStartOfMonth, pEndOfMonth){
    //console.log(this.selectedDate.value.format("MM-DD-YYYY"));
    
    // let startOfMonth = this.selectedDate.value.startOf('month').unix();
    // let endOfMonth = this.selectedDate.value.endOf('month').unix();

    //console.log("start of month is "+startOfMonth+" ENd of month is "+endOfMonth);
    this.crudService.getAllRecognitionForThisUser(pStartOfMonth, pEndOfMonth).subscribe(subscribedData => {
      this.data.changeSpinnerValue(true);
      
      this.recognitionTableData = subscribedData.map(item => {
        return {
          content: item['CONTENT'],
          from: item['FROM'],
          name: item['NAME'],
          subject: item['SUBJECT'],
          date: _moment.unix(item['DATE']['seconds']).format('MM/DD/YYYY')
        }
      })
      this.dataSource = new MatTableDataSource<I_RECOGNITION>(this.recognitionTableData); 
      this.data.changeSpinnerValue(false);
    })

  }
  //   this.data.changeSpinnerValue(true);

  onSave(){
    console.log("on save");
    let record = {};
    
    record["NAME"] = this.emailInputFormGroup.controls.fgName.value;
    record["CONTENT"] = this.emailInputFormGroup.controls.fgContent.value;
    record["DATE"] = this.emailInputFormGroup.controls.fgDate.value.toDate();
    record["SUBJECT"] = this.emailInputFormGroup.controls.fgSubject.value;
    record["FROM"] = this.emailInputFormGroup.controls.fgFrom.value;

    this.crudService.insertAppreciationEmailDetails(record);
  }

  onReset(){
    console.log("on reset");
  }
}
