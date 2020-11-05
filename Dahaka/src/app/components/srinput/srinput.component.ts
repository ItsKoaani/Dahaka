import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import * as moment from 'moment';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface srData {
  srNumber: number;
  srPriority: string;
  srStatus: string;
  srDesc: string;
  srAssignee: string;
  openDate: any ;
  type: string;
  group: string
}

export interface IResource{
  name: string;
  employeeId: string;
}

@Component({
  selector: 'srinput',
  templateUrl: './srinput.component.html',
  styleUrls: ['./srinput.component.css']
})
export class SrinputComponent implements OnInit {

  control: AbstractControl = null;
  resourceList:IResource[] = [];
  registerForm: FormGroup;
  today = new Date();
  submitted = false;

  statusList: string[] = ['Work/Fix In Progress', 'Open', 'Closed', 'Resolved Pending Confirmation', 
  'Pend WCDS Feedback', 'On Hold Pend customer', 'CC Transaltion', 'NA'];
  priorityList: number[] = [1, 2, 3, 4, 5];
  typeList: string[] = ['Request', 'Incident', 'Problem', 'NA'];
  groupList: string[] = ['CC Data Maintenance', 'CC/PR/QC', 'NA'];

  action:string;
  local_data:any;

  constructor(public crudService: CrudService, private formBuilder: FormBuilder) { 
   
    this.today.setDate(this.today.getDate());
  }

  ngOnInit(): void {

    
    this.registerForm = this.formBuilder.group({
      fcOpenDate: [moment() , Validators.required],
      fcSrNumber: [Number, Validators.required],
      fcDescription: ['', Validators.required],
      fcAssignee: ['', [Validators.required]],
      fcSrStatus: ['', [Validators.required]],
      fcPriority: ['', Validators.required],
      fcType: ['', Validators.required],
      fcGroup: ['', Validators.required]
  });

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
    record['srType']=this.f.fcType.value;
    record['srGroup']=this.f.fcGroup.value;
    
    this.crudService.insertSrDetails(record).then(res => {
      console.log(res);
    })
    this.onReset();
    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.registerForm.markAsUntouched();

    Object.keys(this.registerForm.controls).forEach((name) => {
      this.control = this.registerForm.controls[name];
      this.control.setErrors(null);
    });
  }


}
