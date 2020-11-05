import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizeService } from '../../service/authGuard/authorize.service';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {path: '', component: ReportComponent, canActivate: [AuthorizeService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }