import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FloorsService } from 'src/app/services/floors/floors.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  @ViewChild('filter') filter!: ElementRef;
  arrayUsers: any[] = new Array();
  arrayRoles: any[] = new Array();
  arrayFloors: any[] = new Array();
  loading: boolean = false;
  representatives: any[] = [];
  userDialog: boolean = false;
  roles: any[] = new Array();
  floor: any[] = new Array();
  selectedRoles!: any[];
  selectedFloors!: any[];
  idUser: number = 0;
  email: string = "";
  user_name: string = "";
  password: string = "";
  idRole: any[] = new Array();
  rolDialog: boolean = false;
  idRol: number = 0;
  nameRol: string = "";
  floorDialog:boolean=false;
  idFloor: number = 0;
  numberFloor!: number;
  nameFloor: string="";
  constructor(private serviceRoles: RolesService, private serviceUser: UsersService, private serviceFloors: FloorsService) {
    this.getAllUsers();
    this.getRoles();
    this.getAllFloors();
  }

  ngOnInit() {

  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllUsers() {
    this.loading = true;
    this.serviceUser.getAllUsers().subscribe((users: any) => {
      this.arrayUsers = users.list;
      this.loading = false;
    });
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

  getAllFloors() {
    this.serviceFloors.getAllFloors().subscribe((floors: any) => {
      this.arrayFloors = floors.list;
      this.arrayFloors.forEach((floor) => {
        const idFloor = floor.id_cat_floor;
        const numberFloor = floor.number;
        this.floor.push(
          { name: 'Piso ' + numberFloor, code: idFloor },
        );
      });
    });
  }

  openNew() {
    this.userDialog = true;
    this.idUser = 0;
    this.email = "";
    this.user_name = "";
    this.password = "";
    this.idRole = [];
  }

  openDialogRol() {
    this.rolDialog = true;
  }

  openDialogFloor() {
    this.floorDialog = true;
  }

  cancelUser() {
    this.userDialog = false;
  }

  saveUser() {
    if (this.idUser != 0) {
      this.serviceUser.updateUser(this.idUser, this.email, this.user_name, 'Luis1$', [5]).subscribe((resUser) => {
        console.log('ESTO ES EL ACTUALIZAR', resUser);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'User update sucessful',
          showConfirmButton: false
        });
        this.userDialog = false;
        this.getAllUsers();
      }, (err) => {
        console.log(err)
      });
    } else {
      const arrayIdRoles = this.selectedRoles.map(id => id.code);
      this.serviceUser.addUser(this.email, this.user_name, this.password, arrayIdRoles).subscribe((resUser) => {
        console.log(resUser);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'User add sucessful',
          showConfirmButton: false
        });
        this.userDialog = false;
        this.getAllUsers();
      }, (err) => {
        console.log(err)
      });
    }
  }

  detailUser(idUser: string) {
    this.userDialog = true;
    this.idUser = parseInt(idUser);
    this.serviceUser.getUserID(idUser).subscribe((userId: any) => {
      const objUser = userId.user;
      this.email = objUser.email;
      this.user_name = objUser.user_name;
      //const rol = this.roles.find(rol => rol.name === 'Administrador');
      // if (rol) {
      //   this.selectedRoles = [rol];
      // }
    });
  }

  deleteUser(idUser: string) {
    this.serviceUser.deleteUserPhysical(idUser).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'User delete sucessful',
        showConfirmButton: false
      });
    }, (err) => {
      console.log(err)
    });
  }

  saveRol() {
    if (this.idRol != 0) {
      this.serviceRoles.updateRole(this.idRol, this.nameRol, [5]).subscribe((rol)=>{
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Rol update sucessful',
          showConfirmButton: false
        });
      this.getRoles();
      this.nameRol="";
      this.selectedFloors=[];
      }, (err)=>{
        console.log(err);
      });
    } else {
      const arrayIdFloor = this.selectedFloors.map(id => id.code);
      this.serviceRoles.addRole(this.nameRol, arrayIdFloor).subscribe((rol) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Rol add sucessful',
          showConfirmButton: false
        });
      this.getRoles();
      this.nameRol="";
      this.selectedFloors=[];
      }, (err) => {
        console.log(err);
      });
    }
  }

  detailRol(idRol:number){
    this.serviceRoles.getRole(idRol).subscribe((rolId:any)=>{
      const rol=rolId.role;
      this.nameRol=rol.role;
      this.idRol=rol.id_cat_role;
    },(err)=>{
      console.log(err);
    });
  }

  deleteRol(idRol:number){
    this.serviceRoles.deleteRolePhysical(idRol).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Rol delete sucessful',
        showConfirmButton: false
      });
      this.getRoles()
    },(err)=>{
      console.log(err);
    });
  }

  saveFloor() {
    if (this.idFloor != 0) {
      this.serviceFloors.updateFloor(this.idFloor,this.numberFloor,this.nameFloor).subscribe(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Floor update sucessful',
            showConfirmButton: false
          });
        this.getAllFloors();
        this.numberFloor=0;
        this.nameFloor="";
      },(err)=>{
        console.log(err);
      });
    } else {
      this.serviceFloors.addFloor(this.numberFloor,this.nameFloor).subscribe(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Floor add sucessful',
            showConfirmButton: false
          });
        this.getAllFloors();
        this.numberFloor=0;
        this.nameFloor="";
      },(err)=>{
        console.log(err);
      });
    }
  }

  detailFloor(idFloor: number) {
    this.floorDialog = true;
    this.idFloor =(idFloor);
    this.serviceFloors.getFloor(idFloor).subscribe((floorId: any) => {
      const objFloor = floorId.floor;
      this.numberFloor = objFloor.number;
      this.nameFloor = objFloor.name;
    });
  }

  deleteFloor(idFloor: number) {
    this.serviceFloors.deleteFloorPhysical(idFloor).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Floor delete sucessful',
        showConfirmButton: false
      });
      this.getAllFloors()
    }, (err) => {
      console.log(err)
    });
  }


}
