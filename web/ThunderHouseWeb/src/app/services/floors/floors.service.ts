import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URLLOCAL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class FloorsService {
  constructor(private http: HttpClient) { }

  getAllFloors() {
    return this.http.get(URLLOCAL + "api/catalogs/floor?limit=20&page=1");
  }

  getFloor(idFloor:number) {
    return this.http.get(URLLOCAL + "api/catalogs/floor/" + idFloor);
  }

  addFloor(numberFloor: number, nameFloor: string) {
    let body = {
      "number": numberFloor,
      "name": nameFloor
  };
    return this.http.post(URLLOCAL + "api/catalogs/floor", body);
  }

  updateFloor(idFloor:number, numberFloor: number, nameFloor: string) {
    let body={
      "number": numberFloor,
      "name": nameFloor,
      "status":true
  }
    return this.http.put(URLLOCAL + "api/catalogs/floor/"+idFloor, body);
  }

  deleteFloorPhysical(idRole:number) {
    return this.http.delete(URLLOCAL + "api/catalogs/floor/physical/"+idRole);
  }
}
