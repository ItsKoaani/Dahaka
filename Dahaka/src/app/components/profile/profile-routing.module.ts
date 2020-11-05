import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizeService } from '../../service/authGuard/authorize.service';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {path: '', component: ProfileComponent, canActivate: [AuthorizeService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { } 