import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { RoomManagementComponent } from './modules/room-management/room-management.component';
import { ReceptionManagementComponent } from './modules/reception-management/reception-management.component';
import { InventoryManagementComponent } from './modules/inventory-management/inventory-management.component';
import { LeggageManagementComponent } from './modules/leggage-management/leggage-management.component';
import { LogBookManagementComponent } from './modules/log-book-management/log-book-management.component';
import { RoomPdfComponent } from './modules/room-management/room-pdf/room-pdf.component';

const routes: Routes = [
  {
    path: "home",
    component: MainComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "thunderhouse",
    component: HomeComponent
  },
  {
    path: "roomManagement",
    component: RoomManagementComponent
  },
  {
    path: "receptionManagement",
    component: ReceptionManagementComponent
  },
  {
    path: "inventoryManagement",
    component: InventoryManagementComponent
  },
  {
    path: "leggageManagement",
    component: LeggageManagementComponent
  },
  {
    path: "logbookManagement",
    component: LogBookManagementComponent
  },
  {
    path: "roomPDF",
    component: RoomPdfComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
