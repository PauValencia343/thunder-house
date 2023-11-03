import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  getAllClient() {
    return this.http.get(URLLOCAL + "api/catalogs/client?limit=20&page=1");

  }

  getClientID(idClient: number) {
    return this.http.get(URLLOCAL + "api/catalogs/client/" + idClient);
  }

  addClient(name: string, surname_father: string, surname_mother: string,
    phone_contact: string, email_contact: string, birth: string,
    gender: string, street_address: string, city: string,
    state_province: string, zip_code: string, country: string, email: string, user_name: string, password: string) {
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
    }
    return this.http.post(URLLOCAL + "api/catalogs/client", body);
  }

  updateClient(idClient:number, name: string, surname_father: string, surname_mother: string,
    phone_contact: string, email_contact: string, birth: string,
    gender: string, street_address: string, city: string,
    state_province: string, zip_code: string, country: string, email: string, user_name: string, 
    password: string) {
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
      "password": password
    }
    return this.http.put(URLLOCAL + "api/catalogs/client/"+idClient, body);
  }

  deleteClientPhysical(idClient: number) {
    return this.http.delete(URLLOCAL + "api/catalogs/client/" + idClient);
  }
}
