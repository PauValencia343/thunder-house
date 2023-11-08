import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { RoomManagementService } from 'src/app/services/room-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.css']
})
export class RoomStatusComponent {
  arrayRoomStatus: any[] = new Array();
  loading: boolean = false;
  @ViewChild('filter') filter!: ElementRef;
  roomTypeDialog: boolean = false;
  dirty!: string;
  busy!: string;
  idRoomStatus:number=0;


  constructor(private serviceRoomStatus: RoomManagementService) {
    this.getAll();
  }


  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  openDialog() {
    this.idRoomStatus=0;
    this.roomTypeDialog = true;
  }
  cancelRoomType() {
    this.roomTypeDialog = false
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  getAll() {
    this.loading = true;
    this.serviceRoomStatus.getAllRoomsStatus().subscribe((roomStatus: any) => {
      this.arrayRoomStatus = roomStatus.list;
      this.loading = false;
    }, (err) => {
      this.loading = false;
    })
  }

  addRoomStatus(){
    let dirty = this.dirty === "yes" ? true : false;
    let busy = this.busy === "yes" ? true : false;
    if (this.idRoomStatus != 0) {
      this.serviceRoomStatus.updateStatusRoom(this.idRoomStatus,dirty, busy).subscribe(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room Status update sucessful',
          showConfirmButton: false
        });
        this.roomTypeDialog=false;
        this.getAll();
      }, (err)=>{
        console.log(err)
      });
    }else{
      this.serviceRoomStatus.addStatusRoom(dirty, busy).subscribe(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room Status add sucessful',
          showConfirmButton: false
        });
        this.roomTypeDialog=false;
        this.getAll();
      }, (err)=>{
        console.log(err);
      });
    }
  }

  detailRoomStatus(idRoom:number){
    this.idRoomStatus=idRoom;
    this.serviceRoomStatus.getRoomStatus(idRoom).subscribe((roomStatus:any)=>{
      this.roomTypeDialog=true;
      this.busy=roomStatus.roomStatus.busy == true ? 'yes':'no';
      this.dirty=roomStatus.roomStatus.dirty== true ? 'yes':'no';
    },(err)=>{
      console.log(err);
    })
  }

  deleteRoomStatus(idRoom:number){
    this.serviceRoomStatus.deleteStatusRoom(idRoom).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Room Status delete sucessful',
        showConfirmButton: false
      });
      this.getAll();
    }, (err)=>{
      console.log(err);
    });
  }
}
