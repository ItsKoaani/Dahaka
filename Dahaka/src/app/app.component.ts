import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Location } from '@angular/common';

import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dahaka';

  mode = new FormControl('over');

  loginPage: boolean = false;

  constructor(public  router: Router, private location: Location) { }
  
  ngOnInit(): void {
    // console.log("url path ends with "+this.location.path());
    // console.log("url path ends with null? "+(this.location.path() == ""));

    if(this.location.path().endsWith("login") || this.location.path() == "" || 
    this.location.path() == " " ){
      this.loginPage = true;    
      this.router.navigate(['login']);
    }else{
      this.loginPage = false;
    }
  }
}