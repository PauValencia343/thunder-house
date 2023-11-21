import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { InventaryService } from 'src/app/services/inventary/inventary.service';
import { LoginService } from 'src/app/services/login.service';
import { SuppliesService } from 'src/app/services/supplies/supplies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplie-management',
  templateUrl: './supplie-management.component.html',
  styleUrls: ['./supplie-management.component.css']
})
export class SupplieManagementComponent {
  arraySupplie: any[] = new Array();
  supplieDialog:boolean=false;
  loading: boolean = false;
  idSupplie:number=0;
  nameSupplie:string="";
  @ViewChild('filter') filter!: ElementRef;



  constructor(private serviceSupplie: SuppliesService) {
      this.getAllSupplie();
  }


  getAllSupplie(){
    this.serviceSupplie.getAllSupplie().subscribe((supplie:any)=>{
      this.arraySupplie = supplie.list;
    },(err)=>{

    });
  }

  openDialog() {
    this.supplieDialog = true;
    this.idSupplie=0
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  detailSupplie(idSupplie:number){
    this.openDialog();
    this.idSupplie=idSupplie;
    this.serviceSupplie.getAllIdSupplie(idSupplie).subscribe((supplie:any)=>{
      this.nameSupplie=supplie.supplie.supplie;
    },(err)=>{
      console.log(err);
    })
  }

  deleteSupplie(idSupplie:number){
    this.serviceSupplie.deleteSupplie(idSupplie).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Supplie delete sucessful',
        showConfirmButton: false
      });
      this.getAllSupplie()
    },(err)=>{
      console.log(err);
    })
  }

  addSupplie(){
    if(this.idSupplie != 0){
      this.serviceSupplie.updateSupplie(this.idSupplie,this.nameSupplie).subscribe(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Supplie update sucessful',
          showConfirmButton: false
        });
        this.getAllSupplie();
      });
    }else{
      this.serviceSupplie.addSupplie(this.nameSupplie).subscribe(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Supplie add sucessful',
          showConfirmButton: false
        });
        this.getAllSupplie()
      },(err)=>{
        console.log(err);
      })
    }
  }
}
