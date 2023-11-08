import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(URLLOCAL + "api/catalogs/user?limit=20&page=1");

  }

  getUserID(idUser: string) {
    return this.http.get(URLLOCAL + "api/catalogs/user/" + idUser);
  }

  addUser(email: string, user_name: string, password:string, idRole: any[]) {
    let body={
      "email":email,
      "user_name": user_name,
      "password": password,
      "roles": idRole.map(id => ({ "id_role": id }))
  }
    return this.http.post(URLLOCAL + "api/catalogs/user", body);
  }

  updateUser(idUser:number,email: string, user_name: string, password:string, idRole: any[]) {
    let body={
      "email":email,
      "user_name": user_name,
      "password": password,
      "roles": idRole.map(id => ({ "id_role": id })),
      "status" : true
  }

    return this.http.put(URLLOCAL + "api/catalogs/user/"+idUser, body);
  }

  deleteUserPhysical(idUser:string) {
    return this.http.delete(URLLOCAL + "api/catalogs/user/physical/"+idUser);
  }
}
