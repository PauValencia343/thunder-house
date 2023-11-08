import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent {
  @ViewChild('filter') filter!: ElementRef;
  arrayRoles: any[] = new Array();
  loading: boolean = false;
  representatives: any[] = [];

  constructor(private serviceRoles: RolesService){
    this.getRoles();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getRoles(){
    this.serviceRoles.getAllRoles().subscribe((roles:any)=>{
      this.arrayRoles=roles;
    });
  }
}
