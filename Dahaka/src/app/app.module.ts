import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {CrudService} from './service/crud.service';

import { MaterialModule } from './material/material.module';
import { ComComponent } from './components/com/com.component';

import {ReactiveFormsModule} from '@angular/forms';
import { VacationComponent } from './components/vacation/vacation.component';
import { AdminComponent } from './components/admin/admin.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { SrinputComponent } from './components/srinput/srinput.component';

@NgModule({
  declarations: [
    AppComponent,
    ComComponent,
    VacationComponent,
    AdminComponent,
    DialogBoxComponent,
    SrinputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: "", component: ComComponent},
      {path: "vacation", component: VacationComponent},
      {path: "admin", component: AdminComponent}
    ]),
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
