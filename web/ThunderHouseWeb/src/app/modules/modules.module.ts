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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomTypeComponent } from './room-management/room-type/room-type.component';
import { RoomStatusComponent } from './room-management/room-status/room-status.component';
import { PipeRoomsPipe, PipeRoomsPipeEquipments } from './room-management/pipe-rooms.pipe';
import { SupplieManagementComponent } from './supplie-management/supplie-management/supplie-management.component';
import { EmployeeManagementComponent } from './employee-management/employee-management/employee-management.component';
import { ClientManagementComponent } from './client-management/client-management/client-management.component';


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
    UserManagementComponent,
    RoomTypeComponent,
    RoomStatusComponent,
    PipeRoomsPipe,
    PipeRoomsPipeEquipments,
    SupplieManagementComponent,
    EmployeeManagementComponent,
    ClientManagementComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    PrimengModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  exports:[
    HomeComponent,
    NavbarComponent,
    GridModule,
    HttpClientModule
  ]
})
export class ModulesModule { }
