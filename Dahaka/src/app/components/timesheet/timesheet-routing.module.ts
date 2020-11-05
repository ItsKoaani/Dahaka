import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizeService } from '../../service/authGuard/authorize.service';
import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
  {path: '', component: TimesheetComponent, canActivate: [AuthorizeService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComRoutingModule { }