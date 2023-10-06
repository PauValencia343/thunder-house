import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule
  ],
  exports:[
    HomeComponent,
    NavbarComponent
  ]
})
export class ModulesModule { }
