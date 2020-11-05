import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

//for snack bar
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/common/data.service';

export interface userInfo {
  current_location: string;
  email_id: string;
  employee_id: number;
  first_name: string;
  last_name: string;
  office_location: string;
  phone_number: string;
  url: string;
  docId: string;
  caption: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: userInfo[] = [{
    current_location: null,
    email_id: null,
    employee_id: null,
    first_name: null,
    last_name: null,
    office_location: null,
    phone_number: null,
    url: null,
    docId: null,
    caption: null,
    role: null
  }];

  //to set snackbar to top of right side
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //for spinner testing
  spinnerValue: boolean = false;

  userid: any = null;
  imageSrc: string = "/assets/image/default.png";
  selectedImage: string = null;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  showHideValue: boolean = false;

  constructor(public crudService: CrudService, private storage: AngularFireStorage, 
    public router: Router, private _snackBar: MatSnackBar, private data: DataService) { }

  formImageTemplate = new FormGroup({
    formCaption: new FormControl(''),
    subtitle: new FormControl(''),
    imageURL: new FormControl(''),
  })

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("userid");
    this.data.changeSpinnerValue(true);

    this.crudService.getUserInfo(this.userid).subscribe(data => {
      this.userData = data.map(item => {
        return {
          current_location: item['current_location'],
          email_id: item['email_id'],
          employee_id: item['employee_id'],
          first_name: item['first_name'],
          last_name: item['last_name'],
          office_location: item['office_location'],
          phone_number: item['phone_number'],
          url: item['url'],
          docId: item['docId'],
          caption: item['caption'],
          role: item['role']
        }
      })
      
      //console.log(this.formImageTemplate);
      if (this.userData[0].url) {
        this.imageSrc = this.userData[0].url;
      } else {
        this.imageSrc = "/assets/image/default.png";
      }

      this.formImageTemplate.controls.formCaption.setValue(this.userData[0].caption);
      //console.log(this.formImageTemplate);
      this.data.sprinnerValue.subscribe(_spinnerValue => this.spinnerValue = _spinnerValue)
    })

    this.data.changeSpinnerValue(false);
    this.editMode = false;
  }


  showPreviewAndUpdateDisplayPicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      //console.log(this.selectedImage["name"]);
      this.onSubmit(this.formImageTemplate);
    } else {
      this.imageSrc = "/assets/image/default.png";
      this.selectedImage = null;
    }

  }

  onSubmit(formImageTemplateValue: any) {
    //console.log("on submit method");
    //this.spinnerValue = true;
    // console.log(this.value);
    this.data.changeSpinnerValue(true);
    this.isSubmitted = true;
    let record = {};
    if (this.formImageTemplate.valid) {
      var filePath = `displayPicture/${this.selectedImage["name"]}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url => {
            formImageTemplateValue['imageURL'] = url;
            record['url'] = url;
            //console.log(this.userData['docId']);
            this.crudService.insertDisplayPictureUrlOrCaption(this.userData[0].docId, record);
            this.openSnackBar("Display picture updated");
            //this.spinnerValue = false;
            this.data.changeSpinnerValue(false);
          }))
        })
      ).subscribe();
    }
  }

  //to show and hide update button
  onCaptionEdit(){
    this.editMode = true;
  }

  //to update the caption
  updateCaption(){
    let record = {};
    record['caption'] = this.formImageTemplate.controls.formCaption.value;
    console.log(this.formImageTemplate.controls.formCaption.value);
    this.crudService.insertDisplayPictureUrlOrCaption(this.userData[0].docId, record);
    this.editMode = false;    
    this.openSnackBar("Caption Updated");
  }

  //for cancel button
  cancelCaption(){
    this.formImageTemplate.controls.formCaption.setValue(this.userData[0].caption);
    this.editMode = false; 
  }

  //for displaying snackbar
  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //to get back to home sceens
  home(){
    this.router.navigate(['/timesheet'])
  }

  //To logout the user from profile screen
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
