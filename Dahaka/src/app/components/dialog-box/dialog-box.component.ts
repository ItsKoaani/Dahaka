import { Component, OnInit, Optional, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface srData {
  
  srNumber: string;
  srPriority: string;
  srStatus: string;
  srDesc: string;
  srAssignee: string;
  openDate: any ;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {


  ngOnInit(): void {
  }


  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: srData) {  //gets params from actual component of type MatDialogRef and a data to add

    //console.log(data); //loging the data to be added
    this.local_data = {...data}; //storing all param data to local data
    this.action = this.local_data.action; //storing action from this.localdata to this.action of this instant
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});   //sets event to this action. and returns event and local data
  }  

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
