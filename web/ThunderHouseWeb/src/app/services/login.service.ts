import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


const URLLOCAL= 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(credential: string, password:string){
    let body={
      credential,
      password
    }
    return this.http.post(URLLOCAL + "api/auth/login", body);
  }

  getCustomersSmall() {
    return this.http.get<any>('assets/demo/data/customers-small.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
}

getCustomersMedium() {
    return this.http.get<any>('assets/demo/data/customers-medium.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
}

getCustomersLarge() {
    return this.http.get<any>('assets/demo/data/customers-large.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
}

getProductsSmall() {
  return this.http.get<any>('assets/demo/data/products-small.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
}

getProducts() {
  return this.http.get<any>('assets/demo/data/products.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
}

getProductsMixed() {
  return this.http.get<any>('assets/demo/data/products-mixed.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
}

getProductsWithOrdersSmall() {
  return this.http.get<any>('assets/demo/data/products-orders-small.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
}
}
