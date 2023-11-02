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

  //ROOM STATUS
  getAllRoomsStatus(){
    return this.http.get(URLLOCAL + 'api/catalogs/room-status?limit=100&page=1');
  }

  getRoomStatus(idRoom:number){
    return this.http.get(URLLOCAL + 'api/catalogs/room-status/' + idRoom)
  }

  addStatusRoom(dirty:boolean, busy:boolean){
    let body ={
      "dirty": dirty,
      "busy": busy
  }
    return this.http.post(URLLOCAL + 'api/catalogs/room-status',body)
  }

  updateStatusRoom(idRoom:number,dirty:boolean, busy:boolean){
    let body={
      "dirty": dirty,
      "busy": busy,
      "status": true
  }
    return this.http.put(URLLOCAL+'api/catalogs/room-status/'+idRoom,body)
  }

  deleteStatusRoom(idRoom:number){
    return this.http.delete(URLLOCAL+'api/catalogs/room-status/physical/'+idRoom)
  }

 //ROOM TYPE
 getAllRoomType(){
  return this.http.get(URLLOCAL + 'api/catalogs/room-type?limit=10&page=1')
 }

 getRoomType(idRoom:number){
  return this.http.get(URLLOCAL+'api/catalogs/room-type/'+idRoom)
 }

 addRoomType(nameTypeRoom:string, supplies:any[], equipments:any[]){
  let body={
    "room_type": nameTypeRoom,
    "supplies": supplies,
    "equipments": equipments
};
  return this.http.post(URLLOCAL+'api/catalogs/room-type',body);
 }

 updateRoomType(idRoom:number,nameTypeRoom:string, supplies:any[], equipments:any[]){
  let body={
    "room_type": nameTypeRoom,
    "status": true,
    "supplies": supplies,
    "equipments": equipments
};
  return this.http.put(URLLOCAL+'api/catalogs/room-type/'+idRoom,body)
 }

 deleteRoomType(idRoom:number){
  return this.http.delete(URLLOCAL+'api/catalogs/room-type/physical/'+idRoom);
 }


//ROOMS
  getAllRooms() {
    return this.http.get(URLLOCAL + 'api/catalogs/room?limit=20&page=1');
  }

  getRoom(idRoom:number){
    return this.http.get(URLLOCAL+'api/catalogs/room/'+idRoom);
  }

  addRoom(number:number, name:string, fk_cat_floor:number, fk_cat_room_status:number, fk_cat_room_type:number){
    let body={
      "number": number,
      "name": name,
      "fk_cat_floor": fk_cat_floor,
      "fk_cat_room_status": fk_cat_room_status,
      "fk_cat_room_type": fk_cat_room_type
  };
    return this.http.post(URLLOCAL+'api/catalogs/room',body);
  }

  updateRoom(idRoom:number,number:number, name:string, fk_cat_floor:number, fk_cat_room_status:number, fk_cat_room_type:number){
    let body={
      "number": number,
      "name": name,
      "fk_cat_floor": fk_cat_floor,
      "fk_cat_room_status": fk_cat_room_status,
      "fk_cat_room_type": fk_cat_room_type,
      "status": true
  };
    return this.http.put(URLLOCAL+'api/catalogs/room/'+idRoom,body);
  }

  deleteRoom(idRoom:number){
    return this.http.delete(URLLOCAL+'api/catalogs/room/physical/'+idRoom);
  }



}  
