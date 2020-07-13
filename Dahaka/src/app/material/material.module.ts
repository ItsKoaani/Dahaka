import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'; 
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';

const MaterialComponents = [MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule,
   MatListModule, MatTableModule, MatSidenavModule, MatIconModule, MatSelectModule, MatGridListModule
  , MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatCheckboxModule];

@NgModule({
  
  imports: [MaterialComponents],
  
  exports: [MaterialComponents]
})
export class MaterialModule { }
