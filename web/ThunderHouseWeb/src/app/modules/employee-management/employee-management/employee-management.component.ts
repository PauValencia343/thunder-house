import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {
  arrayEmployee: any[]= new Array();
  arrayRoles:any[]=new Array();
  loading:boolean=false;
  employeeDialog:boolean=false;
  @ViewChild('filter') filter!: ElementRef;
  idEmployee: number=0;
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




  constructor(private serviceEmployee: EmployeeService,private serviceRoles: RolesService){
    this.getAllEmployee();
    this.getRoles();
  }

  openDialog() {
    this.employeeDialog = true;
    this.idEmployee=0
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

  getAllEmployee(){
    this.loading=true;
    this.serviceEmployee.getAllEmployee().subscribe((employee:any)=>{
      this.arrayEmployee=employee.list;
      this.loading=false;
    },(err)=>{
      console.log(err)
      this.loading=false;
    })
  }

  addEmployee(){
    if(this.idEmployee !=0){
      const arrayIdRoles = this.selectedRoles.map(id => id.code);
      this.serviceEmployee.updateEmployee(this.idEmployee,this.name, this.surname_father, this.surname_mother, this.phone_contact, this.email_contact,
        this.birth, this.gender, this.street_address, this.city, this.state_province, this.zip_code, this.country,
        this.email, this.user_name, this.password, arrayIdRoles).subscribe(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Employee update sucessful',
            showConfirmButton: false
          });
          this.getAllEmployee();
        }, (err)=>{
          console.log(err);
        })
    }else{
      const arrayIdRoles = this.selectedRoles.map(id => id.code);
      this.serviceEmployee.addEmployee(this.name, this.surname_father, this.surname_mother, this.phone_contact, this.email_contact,
        this.birth, this.gender, this.street_address, this.city, this.state_province, this.zip_code, this.country,
        this.email, this.user_name, this.password, arrayIdRoles).subscribe(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Employee add sucessful',
            showConfirmButton: false
          });
          this.getAllEmployee();
        }, (err)=>{
          console.log(err);
        })
    }
  }

  detailEmployee(idEmployeee:number){
    this.idEmployee = idEmployeee;
    this.employeeDialog = true;
    this.serviceEmployee.getEmployeeID(idEmployeee).subscribe((employee:any)=>{
      let emp=employee.employee;
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

deleteEmployee(idEmployee:number){
this.serviceEmployee.deleteEmployeePhysical(idEmployee).subscribe(()=>{
  Swal.fire({
    icon: 'success',
    title: 'Successful',
    text: 'Employee delete sucessful',
    showConfirmButton: false
  });
  this.getAllEmployee();
},(err)=>{
  console.log(err)
})
}


}
