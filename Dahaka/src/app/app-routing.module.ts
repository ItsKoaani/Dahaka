import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'timesheet',
    loadChildren: () => import('./components/timesheet/timesheet-routing.module').then(m => m.ComRoutingModule)
  },
  {
    path: 'vacation',
    loadChildren: () => import('./components/vacation/vacation-routing.module').then(m => m.VacationRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile-routing.module').then(m => m.ProfileRoutingModule)
  },
  {
    path: 'recognition',
    loadChildren: () => import('./components/recognition/recognition-routing.module').then(m => m.RecognitionRoutingModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./components/report/report-routing.module').then(m => m.ReportRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }