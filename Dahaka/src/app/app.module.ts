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
import {AngularFireStorageModule } from '@angular/fire/storage';

import { MaterialModule } from './material/material.module';
import { TimesheetComponent } from './components/timesheet/timesheet.component';

import { ReactiveFormsModule } from '@angular/forms';
import { VacationComponent } from './components/vacation/vacation.component';
import { AdminComponent } from './components/admin/admin.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { SrinputComponent } from './components/srinput/srinput.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { ProfileComponent } from './components/profile/profile.component';
import {RecognitionComponent} from './components/recognition/recognition.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthorizeService } from './service/authGuard/authorize.service';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    VacationComponent,
    AdminComponent,
    DialogBoxComponent,
    SrinputComponent,
    ReportComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    RecognitionComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(), 
    RouterModule.forRoot([
      {path: " ", component: LoginComponent},
      {path: "login", component: LoginComponent},
      {path: "dashboard", component: DashboardComponent, canActivate: [AuthorizeService]},
      {path: "**", component: LoginComponent}
    ]),
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  entryComponents: [TimesheetComponent, AdminComponent, ReportComponent, HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
