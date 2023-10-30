import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PrimengModule } from '../primeng/primeng/primeng.module';
import { RoomManagementComponent } from './room-management/room-management.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReceptionManagementComponent } from './reception-management/reception-management.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { LeggageManagementComponent } from './leggage-management/leggage-management.component';
import { LogBookManagementComponent } from './log-book-management/log-book-management.component';
import { RoomPdfComponent } from './room-management/room-pdf/room-pdf.component';
import { RolesManagementComponent } from './roles-management/roles-management.component';
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  
  declarations: [
    HomeComponent,
    NavbarComponent,
    RoomManagementComponent,
    ReceptionManagementComponent,
    InventoryManagementComponent,
    LeggageManagementComponent,
    LogBookManagementComponent,
    RoomPdfComponent,
    RolesManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    PrimengModule,
    GridModule
    
  ],
  exports:[
    HomeComponent,
    NavbarComponent,
    GridModule
  ]
})
export class ModulesModule { }
