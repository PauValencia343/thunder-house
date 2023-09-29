import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingRoutingModule } from './security-routing-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingRoutingModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class SecurityRoutingModule { }
