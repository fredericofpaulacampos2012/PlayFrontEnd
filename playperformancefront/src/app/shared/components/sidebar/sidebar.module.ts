import { UtilService } from './../../services/utils.service';
import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,MaterialModule,RouterModule
  ],
  exports:[SidebarComponent],
  providers:[UtilService]
})
export class SidebarModule { }
