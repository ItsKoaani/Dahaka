import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';

import { CrudService } from '../../service/crud.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as moment from 'moment';

import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';


export interface IResource{
  name: string;
  employeeId: string;
}

//const m = moment(); 

export interface srData {
  srId: string;
  srNumber: string;
  srPriority: string;
  srStatus: string;
  srDesc: string;
  srAssignee: string;
}



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  control: AbstractControl = null;
  registerForm: FormGroup;
  submitted = false;

  tablElementData: srData[] = [];
  resourceList:IResource[] = [];
 
  priorityList: string[] = ['1', '2', '3', '3', '4', '5'];

  selection = new SelectionModel<srData>(true, []);

  displayedColumns: string[] = ['srNumber', 'srDesc', 'srAssignee', 'srStatus', 'openDate', 'srPriority', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public crudService: CrudService, private formBuilder: FormBuilder, public dialog: MatDialog) {

  }

  @ViewChild(MatTable,{static:true}) table: MatTable<any>; //table of typr MatTable module

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      fcOpenDate: [moment() , Validators.required],
      fcSrNumber: ['', Validators.required],
      fcDescription: ['', Validators.required],
      fcAssignee: ['', [Validators.required]],
      fcSrStatus: ['', [Validators.required]],
      fcPriority: ['', Validators.required]
  });


    this.crudService.getAllSrDetail().subscribe(data => {
      this.tablElementData = data.map(item => {
        return {
          srId: item.payload.doc.id,
          srNumber: item.payload.doc.data()['srNumber'],
          srPriority: item.payload.doc.data()['srPriority'],
          srStatus: item.payload.doc.data()['srStatus'],
          srDesc: item.payload.doc.data()['srDesc'],
          srAssignee: item.payload.doc.data()['srAssignee'],
          openDate: moment.unix(item.payload.doc.data()['openDate']['seconds']).format('MM/DD/YYYY')
          // moment.unix(item['openDate']['seconds']).format('MM/DD/YYYY')
        }
      })
      console.log(this.tablElementData);
      this.dataSource = new MatTableDataSource<srData>(this.tablElementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log(this.tablElementData);
    })

    this.crudService.getAllResource().subscribe(data =>{
      this.resourceList = data.map(item=>{
        return{
          name: item['name'], 
          employeeId: item['employeeId']
        }
      })
    })
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.registerForm.markAsUntouched();

    Object.keys(this.registerForm.controls).forEach((name) => {
      this.control = this.registerForm.controls[name];
      this.control.setErrors(null);
    });
  }

  onSave(){
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }

    let record = {};
    
    record['openDate']=this.f.fcOpenDate.value;
    //console.log("form date is  "+this.f.fcOpenDate.value);

    record['srNumber']=this.f.fcSrNumber.value;
    record['srDesc']=this.f.fcDescription.value;
    record['srAssignee']=this.f.fcAssignee.value['name'];
    record['srPriority']=this.f.fcPriority.value;
    record['srStatus']=this.f.fcSrStatus.value;

    this.crudService.insertSrDetails(record).then(res => {
      console.log(res);
    })
    this.onReset();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //to ennable edit and update buttons

  openDialog(action, obj) {  //add action and obj send here from html file
    obj.action = action;      //setting action ppt of obj to action(add, delete, update)
    const dialogRef = this.dialog.open(DialogBoxComponent, {   // this opens 'dialog' which is initaialised in constructor 
      width: '1000px', //open method has component name and object with ppt like style and 
      data:obj      // obj as ppt
    });

    dialogRef.afterClosed().subscribe(result => {  //after dialogdif closed. we are subscribing to its values      
       if(result.event == 'Update'){   //if update is called
        this.updateRowData(result.data);  
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data); 
      }
    });
  }

  updateRowData(row_obj){
    this.dataSource = this.dataSource.data.filter((value,key)=>{   //filter value and keys here
      if(value.srId == row_obj.srId){  //if position id of row obj and current ds values are same
        this.crudService.update_employee(value.srId, row_obj) //then obj name is assigned to value name
      }
      this.table.renderRows(); // nw reders data
      return true; //return true after render
    });
  }

  deleteRowData(row_obj){
    console.log(row_obj)
    console.log(this.dataSource)
    this.dataSource = this.dataSource.data.filter((value,key)=>{
      if(value.srId == row_obj.srId){
        this.crudService.delete_employee(row_obj.srId);
      }
      return true;  //checks for positon of delete and current ds position to be true
    });

  }

}
