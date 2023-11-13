import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RememberRoutingModule } from './remember-routing.module';
import { RememberComponent } from './remember.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule  } from '@angular/forms';
import { ListComponent } from 'src/app/components/list/list.component';
import { AddLinksComponent } from 'src/app/components/add-links/add-links.component';
@NgModule({
  declarations: [
    RememberComponent,
    ListComponent,
    AddLinksComponent
  ],
  imports: [
    CommonModule,
    RememberRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RememberModule { }
