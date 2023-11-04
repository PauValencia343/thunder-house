import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.get(URLLOCAL + "api/catalogs/employee?limit=20&page=1");

  }

  getEmployeeID(idEmployee: number) {
    return this.http.get(URLLOCAL + "api/catalogs/employee/" + idEmployee);
  }

  addEmployee(name: string, surname_father: string, surname_mother: string,
    phone_contact: string, email_contact: string, birth: string,
    gender: string, street_address: string, city: string,
    state_province: string, zip_code: string, country: string, email: string, user_name: string, password: string, idRole: any[]) {
    let body = {
      "name": name,
      "surname_father": surname_father,
      "surname_mother": surname_mother,
      "phone_contact": phone_contact,
      "email_contact": email_contact,
      "birth": birth,
      "gender": gender,
      "street_address": street_address,
      "city": city,
      "state_province": state_province,
      "zip_code": zip_code,
      "country": country,
      "email": email,
      "user_name": user_name,
      "password": password,
      "roles": idRole.map(id => ({ "id_role": id }))
    }
    return this.http.post(URLLOCAL + "api/catalogs/employee", body);
  }

  updateEmployee(idEmployee:number, name: string, surname_father: string, surname_mother: string,
    phone_contact: string, email_contact: string, birth: string,
    gender: string, street_address: string, city: string,
    state_province: string, zip_code: string, country: string, email: string, user_name: string, password: string, idRole: any[]) {
    let body = {
      "person_status": true,
      "name": name,
      "surname_father": surname_father,
      "surname_mother": surname_mother,
      "phone_contact": phone_contact,
      "email_contact": email_contact,
      "birth": birth,
      "gender": gender,
      "street_address": street_address,
      "city": city,
      "state_province": state_province,
      "zip_code": zip_code,
      "country": country,
      "user_status": true,
      "email": email,
      "user_name": user_name,
      "password": password,
      "roles": idRole.map(id => ({ "id_role": id }))
    }
    return this.http.put(URLLOCAL + "api/catalogs/employee/"+idEmployee, body);
  }

  deleteEmployeePhysical(idEmployee: number) {
    return this.http.delete(URLLOCAL + "api/catalogs/employee/" + idEmployee);
  }
}
