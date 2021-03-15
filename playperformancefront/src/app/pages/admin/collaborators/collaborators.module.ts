import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsComponent } from './collaborators.component';
import { MaterialModule } from 'src/app/material.module';
import { CollaboratorRoutingModule } from './collaborators-routing.module';

@NgModule({
  declarations: [CollaboratorsComponent],
  imports: [
    CommonModule,
    CollaboratorRoutingModule,
    MaterialModule
  ]
})
export class CollaboratorsModule { }
