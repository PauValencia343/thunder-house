import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URLLOCAL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {

  constructor(private http: HttpClient) { }

  exportPdfRooms$ = new EventEmitter<any>();

  getAllRooms() {
    return this.http.get(URLLOCAL + 'api/catalogs/room?limit=20&page=1');
  }

}  
