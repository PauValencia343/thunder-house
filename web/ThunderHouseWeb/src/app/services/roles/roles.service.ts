import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get(URLLOCAL + "api/catalogs/role?limit=20&page=1");

  }

  getRole(idRole: number) {
    return this.http.get(URLLOCAL + "api/catalogs/role/" + idRole);
  }

  addRole(nameRole: string, idFloors: any[]) {
    let body = {
      "role": nameRole,
      "floors": idFloors.map(id => ({ "id_floor": id }))
    };
    return this.http.post(URLLOCAL + "api/catalogs/role", body);
  }

  updateRole(idRole:number, newRoleName:string, idFloors: any[]) {
    let body={
      "role": newRoleName,
      "floors": idFloors.map(id => ({ "id_floor": id })),
      "status":true
  }
    return this.http.put(URLLOCAL + "api/catalogs/role/"+idRole, body);
  }

  deleteRolePhysical(idRole:number) {
    return this.http.delete(URLLOCAL + "api/catalogs/role/physical/"+idRole);
  }

}
