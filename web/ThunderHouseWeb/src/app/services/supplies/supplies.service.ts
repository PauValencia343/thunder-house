import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private http: HttpClient) { }

  getAllSupplie(){
    return this.http.get(URLLOCAL+'api/catalogs/supplie?limit=10&page=1');
  }

  getAllIdSupplie(idSupplie: number){
    return this.http.get(URLLOCAL+'api/catalogs/supplie/'+idSupplie)
  }

  addSupplie(supplie:string){
    let body={
      "supplie": supplie
  }
  return this.http.post(URLLOCAL+'api/catalogs/supplie',body);
  }

  updateSupplie(idSupplie: number,supplie:string){
    let body={
      "supplie": supplie,
      "status": true
  }
  return this.http.put(URLLOCAL+'api/catalogs/supplie/'+idSupplie,body);
  }

  deleteSupplie(idSupplie: number){
    return this.http.delete(URLLOCAL+'api/catalogs/supplie/physical/'+idSupplie);
  }
}
