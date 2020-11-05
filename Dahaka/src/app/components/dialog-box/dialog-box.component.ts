import { Component, OnInit, Optional, Inject } from '@angular/core';

import { CrudService } from '../../service/crud.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as moment from 'moment';

export interface IResource{
  name: string;
  employeeId: string;
}

export interface srData {
  
  srId: string;
  srNumber: string;
  srPriority: string;
  srStatus: string;
  srDesc: string;
  srAssignee: string;
  openDate: Date;
  srType: string;
  srGroup: string;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  today = new Date();

  statusList: string[] = ['Work/Fix In Progress', 'Open', 'Closed', 'Resolved Pending Confirmation', 
  'Pend WCDS Feedback', 'On Hold Pend customer', 'CC Transaltion'];
  priorityList: number[] = [1, 2, 3, 4, 5];
  typeList: string[] = ['Request', 'Incident', 'Problem'];
  groupList: string[] = ['CC Data Maintenance', 'CC/PR/QC'];

  resourceList:IResource[] = [];

  registerForm: FormGroup;

  ngOnInit(): void {

    
  this.crudService.getAllResource().subscribe(data =>{
    this.resourceList = data.map(item=>{
      return{
        name: item['name'], 
        employeeId: item['employeeId']
      }
    })
  })
    
  }


  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: srData, private formBuilder: FormBuilder, public crudService: CrudService, ) {  //gets params from actual component of type MatDialogRef and a data to add

    //console.log(data); //loging the data to be added
    //console.log(data);
    this.local_data = {...data}; //storing all param data to local data
    this.action = this.local_data.action; //storing action from this.localdata to this.action of this instant
    this.today.setDate(this.today.getDate());
    console.log(this.local_data);
  }

  doAction(){
    console.log(this.action, this.local_data);
    this.dialogRef.close({event:this.action,data:this.local_data});   //sets event to this action. and returns event and local data
  }  

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
