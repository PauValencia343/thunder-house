import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ClientService } from 'src/app/services/client/client.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent {
  arrayClient: any[]= new Array();
  arrayRoles:any[]=new Array();
  loading:boolean=false;
  clientDialog:boolean=false;
  @ViewChild('filter') filter!: ElementRef;
  idClient: number=0;
  email: string = "";
  user_name: string = "";
  password: string = "";
  idRole: any[] = new Array();
  roles: any[] = new Array();
  selectedRoles!: any[];
  name: string="";
  surname_father: string="";
  surname_mother: string="";
  phone_contact: string="";
  email_contact: string="";
  birth: string="";
  gender: string="";
  street_address: string="";
  city:string="";
  state_province: string="";
  zip_code: string="";
  country: string="";




  constructor(private serviceClient: ClientService,private serviceRoles: RolesService){
    this.getAllClient();
    this.getRoles();
  }

  openDialog() {
    this.clientDialog = true;
    this.idClient=0
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getRoles() {
    this.loading = true;
    this.serviceRoles.getAllRoles().subscribe((roles: any) => {
      this.arrayRoles = roles.list;
      this.loading = false;
      this.arrayRoles.forEach((rol) => {
        const idRole = rol.id_cat_role;
        const nameRol = rol.role;
        this.roles.push(
          { name: nameRol, code: idRole },
        );
      });
      // const rol = this.roles.find(rol => rol.name === 'Administrador');
      // if (rol) {
      //   this.selectedRoles = [rol];
      // }
    });
  }

  getAllClient(){
    this.loading=true;
    this.serviceClient.getAllClient().subscribe((client:any)=>{
      this.arrayClient=client.list;
      this.loading=false;
    },(err)=>{
      console.log(err)
      this.loading=false;
    })
  }

  addClient(){
    if(this.idClient !=0){
      this.serviceClient.updateClient(this.idClient,this.name, this.surname_father, this.surname_mother, this.phone_contact, this.email_contact,
        this.birth, this.gender, this.street_address, this.city, this.state_province, this.zip_code, this.country,
        this.email, this.user_name, this.password).subscribe(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Client update sucessful',
            showConfirmButton: false
          });
          this.getAllClient();
        }, (err)=>{
          console.log(err);
        })
    }else{
      this.serviceClient.addClient(this.name, this.surname_father, this.surname_mother, this.phone_contact, this.email_contact,
        this.birth, this.gender, this.street_address, this.city, this.state_province, this.zip_code, this.country,
        this.email, this.user_name, this.password).subscribe(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Client add sucessful',
            showConfirmButton: false
          });
          this.getAllClient();
        }, (err)=>{
          console.log(err);
        })
    }
  }

  detailClient(idCliente:number){
    this.idClient = idCliente;
    this.clientDialog = true;
    this.serviceClient.getClientID(idCliente).subscribe((client:any)=>{
      let emp=client.client;
      this.name=emp.name
      this.surname_father=emp.surname_father
      this.surname_mother=emp.surname_mother 
      this.phone_contact=emp.phone_contact 
      this.email_contact=emp.email_contact
      this.birth=emp.birth 
      this.gender=emp.gender 
      this.street_address=emp.street_address 
      this.city=emp.city 
      this.state_province=emp.state_province 
      this.zip_code=emp.zip_code 
      this.country=emp.country
      this.email=emp.cat_employee.cat_user.email 
      this.user_name=emp.cat_employee.cat_user.user_name
      this.password='12_:abCD';
      const codesToFind = emp.cat_employee.cat_user.detail_user_role.map((item:any) => item.cat_role.id_cat_role);
      this.selectedRoles = this.roles.filter(rol => codesToFind.includes(rol.code));
    }, (err)=>{
      console.log(err);
    })
  }

deleteClient(idClient:number){
this.serviceClient.deleteClientPhysical(idClient).subscribe(()=>{
  Swal.fire({
    icon: 'success',
    title: 'Successful',
    text: 'Client delete sucessful',
    showConfirmButton: false
  });
  this.getAllClient();
},(err)=>{
  console.log(err)
})
}
}
