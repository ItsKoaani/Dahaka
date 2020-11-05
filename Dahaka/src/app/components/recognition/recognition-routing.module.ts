import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizeService } from '../../service/authGuard/authorize.service';
import { RecognitionComponent } from './recognition.component';

const routes: Routes = [
  {path: '', component: RecognitionComponent, canActivate: [AuthorizeService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecognitionRoutingModule { }