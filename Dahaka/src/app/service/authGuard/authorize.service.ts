import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService implements CanActivate {

  constructor() { }

  canActivate(): boolean {
    //if (this.localStorage.retrieve("userid")) {
    if (sessionStorage.getItem("userid")) {
      return true;
    } else {
      alert("Please log in");
      return false;
    }

  }

}
