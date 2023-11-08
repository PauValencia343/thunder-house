import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingRoutingModule } from './security-routing-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingRoutingModule,
    FormsModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class SecurityRoutingModule { }
