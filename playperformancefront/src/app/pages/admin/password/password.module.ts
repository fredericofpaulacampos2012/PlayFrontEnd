import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordComponent } from './password.component';
import { PasswordRoutingModule } from './password-routing.module';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PasswordModule { }
