import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { LoginService } from 'src/app/services/login.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import jsPDF from 'jspdf';
import { RoomManagementService } from 'src/app/services/room-management.service';
import Swal from 'sweetalert2';
import { SuppliesService } from 'src/app/services/supplies/supplies.service';
import { InventaryService } from 'src/app/services/inventary/inventary.service';
import { FloorsService } from 'src/app/services/floors/floors.service';



@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class RoomManagementComponent {
  arrayRooms: any[] = new Array();
  roomStatusDialog: boolean = false;
  arrayRoomStatus: any[] = new Array();
  loading: boolean = false;
  @ViewChild('filter') filter!: ElementRef;
  roomTypeDialog: boolean = false;
  dirty!: string;
  busy!: string;
  idRoomStatus: number = 0;
  arrayRoomType: any[] = new Array();
  idRoomType: number = 0;
  nameTypeRoom: string = '';
  supplies: any[] = new Array();
  equipments: any[] = new Array();
  arraySupplies: any[] = new Array();
  arrayEquipments: any[] = new Array();
  id_supplie: number = 0;
  total_supplies: number = 0;
  id_equipment: number = 0;
  total_equipments: number = 0;
  room_type: number = 0;
  roomDialog: boolean = false;
  arrayFloor: any[] = new Array();
  idRoom: number = 0;
  number!: number;
  name: string = "";
  fk_cat_floor!: number;
  fk_cat_room_status!: number;
  fk_cat_room_type!: number;

  constructor(private customerService: LoginService,
    private productService: LoginService,
    private serviceRooms: RoomManagementService,
    private serviceRoomStatus: RoomManagementService,
    private serviceSupplies: SuppliesService,
    private serviceEquipments: InventaryService,
    private serviceFloor: FloorsService) {
    this.getAllRooms();
    this.getAll();
    this.getAllRoomType();
    this.getAllSupplies();
    this.getAllEquipments();
    this.getAllFloor()
  }

  getAllSupplies() {
    this.serviceSupplies.getAllSupplie().subscribe((supplies: any) => {
      this.arraySupplies = supplies.list;
    }, (err) => {
      console.log(err)
    })
  }
  addSupplies() {
    const existingSupplyIndex = this.supplies.findIndex(supply => supply.id_supplie === this.id_supplie);
    const totalToAdd = Number(this.total_supplies);

    if (existingSupplyIndex !== -1) {
      this.supplies[existingSupplyIndex].total_supplies += totalToAdd;
    } else {
      this.supplies.push({
        "id_supplie": this.id_supplie,
        "total_supplies": totalToAdd
      });
    }
  }


  removeSupplies(index: number) {
    this.supplies.splice(index, 1);
  }

  getAllEquipments() {
    this.serviceEquipments.getAllInventary().subscribe((equipments: any) => {
      this.arrayEquipments = equipments.list;
    }, (err) => {
      console.log(err)
    })
  }

  addEquipments() {
    const existingEquipmentIndex = this.equipments.findIndex(equipment => equipment.id_equipment === this.id_equipment);
    const totalToAdd = Number(this.total_equipments);
    if (existingEquipmentIndex !== -1) {
      this.equipments[existingEquipmentIndex].total_equipments += totalToAdd;
    } else {
      this.equipments.push({
        "id_equipment": this.id_equipment,
        "total_equipments": totalToAdd
      });
    }
  }


  removeEquipments(index: number) {
    this.equipments.splice(index, 1);
  }

  getAllRooms() {
    this.serviceRooms.getAllRooms().subscribe((rooms: any) => {
      this.arrayRooms = rooms.list;
      console.log(this.arrayRooms)
    }, (err) => {
      console.log(err)
    });
  }

  openDialogRoomStatus() {
    this.roomStatusDialog = true;
  }

  openDialog() {
    this.idRoomStatus = 0;
    this.roomTypeDialog = true;
  }
  cancelRoomType() {
    this.roomTypeDialog = false
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

  addRoomStatus() {
    let dirty = this.dirty === "yes" ? true : false;
    let busy = this.busy === "yes" ? true : false;
    if (this.idRoomStatus != 0) {
      this.serviceRoomStatus.updateStatusRoom(this.idRoomStatus, dirty, busy).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room Status update sucessful',
          showConfirmButton: false
        });
        this.roomTypeDialog = false;
        this.getAll();
      }, (err) => {
        console.log(err)
      });
    } else {
      this.serviceRoomStatus.addStatusRoom(dirty, busy).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room Status add sucessful',
          showConfirmButton: false
        });
        this.roomTypeDialog = false;
        this.getAll();
      }, (err) => {
        console.log(err);
      });
    }
  }

  detailRoomStatus(idRoom: number) {
    this.idRoomStatus = idRoom;
    this.serviceRoomStatus.getRoomStatus(idRoom).subscribe((roomStatus: any) => {
      this.busy = roomStatus.roomStatus.busy == true ? 'yes' : 'no';
      this.dirty = roomStatus.roomStatus.dirty == true ? 'yes' : 'no';
    }, (err) => {
      console.log(err);
    })
  }

  deleteRoomStatus(idRoom: number) {
    this.serviceRoomStatus.deleteStatusRoom(idRoom).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Room Status delete sucessful',
        showConfirmButton: false
      });
      this.getAll();
    }, (err) => {
      console.log(err);
    });
  }


  getAllRoomType() {
    this.serviceRooms.getAllRoomType().subscribe((roomType: any) => {
      this.arrayRoomType = roomType.list;
    }, (err) => {
      console.log(err);
    });
  }

  openDialogRoomType() {
    this.roomTypeDialog = true;
  }

  addRoomType() {
    if (this.idRoomType != 0) {
      this.serviceRooms.updateRoomType(this.idRoomType, this.nameTypeRoom, this.supplies, this.equipments).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room Type update sucessful',
          showConfirmButton: false
        });
        this.getAllRoomType()
      }, (err) => {
        console.log(err);
      });
    } else {
      this.serviceRooms.addRoomType(this.nameTypeRoom, this.supplies, this.equipments).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room Type add sucessful',
          showConfirmButton: false
        });
        this.getAllRoomType();
      }, (err) => {
        console.log(err);
      })
    }
  }

  detailRoomType(idRoom: number) {
    this.idRoomType = idRoom;
    this.openDialogRoomType()
    this.serviceRooms.getRoomType(idRoom).subscribe((room: any) => {
      this.nameTypeRoom = room.roomType.room_type;
      const equipmentDetails = room.roomType.detail_equipment_room_type.map((item:any) => {
        return {
          "id_equipment": item.cat_equipment.id_cat_equipment,
          "total_equipments": item.total_equipments
        };
      });
      this.equipments = equipmentDetails;

      const supplieDetails = room.roomType.detail_supplie_room_type.map((item:any) => {
        return {
          "id_supplie": item.cat_supplie.id_cat_supplie,
          "total_supplies": item.total_supplies
        };
      });
      this.supplies = supplieDetails;

    }, (err) => {
      console.log(err);
    })
  }

  deleteRoomType(idRoom: number) {
    this.serviceRooms.deleteRoomType(idRoom).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Room Type delete sucessful',
        showConfirmButton: false
      });
      this.getAllRoomType()
    }, (err) => {
      console.log(err);
    });
  }

  openDialogAddRoom() {
    this.roomDialog = true;
  }

  getAllFloor() {
    this.serviceFloor.getAllFloors().subscribe((floor: any) => {
      this.arrayFloor = floor.list;
    }, (err) => {
      console.log(err)
    });
  }

  addRoom() {
    if (this.idRoom != 0) {
      this.serviceRooms.updateRoom(this.idRoom, this.number, this.name, this.fk_cat_floor, this.fk_cat_room_status, this.fk_cat_room_type).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room update sucessful',
          showConfirmButton: false
        });
        this.getAllRooms();
      }, (err) => {
        console.log(err);
      })
    } else {
      this.serviceRooms.addRoom(this.number, this.name, this.fk_cat_floor, this.fk_cat_room_status, this.fk_cat_room_type).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Room add sucessful',
          showConfirmButton: false
        });
        this.getAllRooms();
      }, (err) => {
        console.log(err);
      })
    }
  }

  detailRoom(idRoom: number) {
    this.openDialogAddRoom();
    this.idRoom=idRoom;
    this.serviceRooms.getRoom(idRoom).subscribe((room: any) => {
      this.number = room.room.number;
      this.name = room.room.name;
      this.fk_cat_floor = room.room.cat_floor.id_cat_floor;
      this.fk_cat_room_status = room.room.cat_room_status.id_cat_room_status;
      this.fk_cat_room_type = room.room.cat_room_type.id_cat_room_type;
    }, (err) => {
      console.log(err);
    })
  }

  deleteRoom(idRoom: number) {
    this.serviceRooms.deleteRoom(idRoom).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Room delete sucessful',
        showConfirmButton: false
      });
      this.getAllRooms();
    }, (err) => {
      console.log(err);
    })
  }




  customers1: any[] = [];

  customers2: any[] = [];

  customers3: any[] = [];

  selectedCustomers1: any[] = [];

  selectedCustomer: any = {};

  representatives: any[] = [];

  statuses: any[] = [];

  products: any[] = [];

  rowGroupMetadata: any;

  expandedRows: any = {};

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;


  sizes: any = [];

  pdfDialog: boolean = false;



  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
    this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
    this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
    this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];

    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large', class: 'p-datatable-lg' }
    ];
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.customers3) {
      for (let i = 0; i < this.customers3.length; i++) {
        const rowData = this.customers3[i];
        const representativeName = rowData?.representative?.name || '';

        if (i === 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        }
        else {
          const previousRowData = this.customers3[i - 1];
          const previousRowGroup = previousRowData?.representative?.name;
          if (representativeName === previousRowGroup) {
            this.rowGroupMetadata[representativeName].size++;
          }
          else {
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  expandAll() {
    if (!this.isExpanded) {
      this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getSeverity(status: any): string {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return 'default'; // Provide a default value for unrecognized statuses.

      default:
        return 'default'; // Also handle the default case in case of undefined or other unexpected values.
    }
  }


  openDialogPDF() {
    this.serviceRooms.exportPdfRooms$.emit(this.pdfDialog = true);
  }

}
