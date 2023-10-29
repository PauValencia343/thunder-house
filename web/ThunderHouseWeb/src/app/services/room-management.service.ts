import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {

  constructor(private http: HttpClient) { }

  exportPdfRooms$ = new EventEmitter<any>();

}
