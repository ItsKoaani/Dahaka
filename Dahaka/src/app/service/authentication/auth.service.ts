import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private angularFireAuth: AngularFireAuth, private  router: Router) { 
    this.angularFireAuth.authState.subscribe(auth => {
      this.authState = auth;
    })
  }

  loginWithEmail(email: string, password: string ){
      return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
        })
        .catch((error) => {
          console.log(error)
          throw error
        });
  }
}
