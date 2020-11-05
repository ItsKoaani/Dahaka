import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authentication/auth.service';
import { Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { DataService } from 'src/app/service/common/data.service';
import { CrudService } from 'src/app/service/crud.service';

export interface userInfo {
  email_id: string;
  employee_id: number;
  first_name: string;
  last_name: string;
  role: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  message = "";

  userid: any = null;

  spinnerValue: boolean;

  userData: userInfo[] = [{
    email_id: null,
    employee_id: null,
    first_name: null,
    last_name: null,
    role: null
  }];

  constructor(private authservice: AuthService, private router: Router, private commonData: DataService,
    public crudService: CrudService) { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    this.commonData.sprinnerValue.subscribe(_spinnerValue => this.spinnerValue = _spinnerValue)
  }


  login(email: string, password: string) {

    if (this.validateCredentials(email, password)) {
      this.commonData.changeSpinnerValue(true);
      this.authservice.loginWithEmail(email, password)
        .then(() => {
          this.userid = this.authservice.authState.user.uid;
          sessionStorage.setItem("userid", this.userid);

          this.setAllSessionStorage(this.userid);
          this.commonData.changeSpinnerValue(false);
          this.router.navigate(['timesheet']);
        }).catch((error) => {
          this.router.navigate(['login']);
          this.message = "Email or Password is incorect";
          this.commonData.changeSpinnerValue(false);
        })
    }
  }

  validateCredentials(email, password) {

    if (email.length === 0 && password.length === 0) {
      this.message = "Email and Password fields cannot be empty";
      return false;
    } else {
      if (email.length === 0) {
        this.message = "Email field cannot be empty";
        return false;
      }

      if (password.length === 0) {
        this.message = "Password field cannot be empty";
        return false;
      }
    }

    return true;
  }


  async setAllSessionStorage(userId: any) {
    this.crudService.getUserInfo(this.userid).subscribe(data => {
      this.userData = data.map(item => {
        return {
          email_id: item['email_id'],
          employee_id: item['employee_id'],
          first_name: item['first_name'],
          last_name: item['last_name'],
          role: item['role']
        }
      })

      sessionStorage.setItem("userName", this.userData[0].last_name + ", " + this.userData[0].first_name);
      sessionStorage.setItem("emailId", this.userData[0].email_id);
      sessionStorage.setItem("employeeId", this.userData[0].employee_id.toString());
      sessionStorage.setItem("role", this.userData[0].role);
    })
  }  

}