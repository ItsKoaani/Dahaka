import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizeService } from '../../service/authGuard/authorize.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthorizeService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }