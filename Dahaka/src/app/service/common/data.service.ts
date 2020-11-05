import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private appSpinner = new BehaviorSubject<boolean>(false);
  sprinnerValue = this.appSpinner.asObservable();

  constructor() { }

  changeSpinnerValue(_message: boolean){
    //console.log("Spinner value "+_message);
    this.appSpinner.next(_message);
  }
}
