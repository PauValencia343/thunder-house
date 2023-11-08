import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class InventaryService {

  constructor(private http: HttpClient) { }

  getAllInventary(){
    return this.http.get(URLLOCAL+'api/catalogs/equipment?limit=10&page=1');
  }

  getAllId(idInventary: number){
    return this.http.get(URLLOCAL+'api/catalogs/equipment/'+idInventary)
  }

  addInventory(nameEquipament:string, totalNumberPeople:number){
    let body={
      "equipment": nameEquipament,
      "total_number_people": totalNumberPeople
  }
  return this.http.post(URLLOCAL+'api/catalogs/equipment',body);
  }

  updateInventory(idInventary: number,nameEquipament:string, totalNumberPeople:number){
    let body={
      "equipment": nameEquipament,
      "total_number_people": totalNumberPeople,
      "status": true
  }
  return this.http.put(URLLOCAL+'api/catalogs/equipment/'+idInventary,body);
  }

  deleteInventory(idInventary: number){
    return this.http.delete(URLLOCAL+'api/catalogs/equipment/physical/'+idInventary);
  }
}
