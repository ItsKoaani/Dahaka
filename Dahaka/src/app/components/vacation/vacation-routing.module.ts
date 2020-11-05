import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizeService } from '../../service/authGuard/authorize.service';
import { VacationComponent } from './vacation.component';

const routes: Routes = [
  {path: '', component: VacationComponent, canActivate: [AuthorizeService]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationRoutingModule { }