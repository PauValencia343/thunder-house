import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { LoginService } from 'src/app/services/login.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InventaryService } from 'src/app/services/inventary/inventary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css'],
  providers: [MessageService]

})
export class InventoryManagementComponent {
    arrayInventary: any[]= new Array();
    inventoryDialog:boolean=false;
    idInventory:number=0;
    nameEquipament!:string;
    totalNumberPeople!:number;

    constructor(private customerService: LoginService, 
                private productService: LoginService, 
                private messageService: MessageService,
                private serviceInventary: InventaryService) {
    this.getAllInventary();
                 }

    getAllInventary(){
        this.serviceInventary.getAllInventary().subscribe((inventary:any)=>{
            this.arrayInventary=inventary.list;
            console.log(this.arrayInventary);
        },(err)=>{
            console.log(err);
        })
    }

    openDialog(){
        this.inventoryDialog=true;
    }

    addInventory(){
        if (this.idInventory != 0) {
            this.serviceInventary.updateInventory(this.idInventory, this.nameEquipament, this.totalNumberPeople).subscribe(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Inventory update sucessful',
                    showConfirmButton: false
                  });
                  this.inventoryDialog=false;
                  this.getAllInventary();
            },(err)=>{
                console.log(err);
            });
        }else{
            this.serviceInventary.addInventory(this.nameEquipament, this.totalNumberPeople).subscribe(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Inventory add sucessful',
                    showConfirmButton: false
                  });
                this.inventoryDialog=false;
                this.getAllInventary();
            },(err)=>{
                console.log(err);
            });
        }
    }

    detailInventory(idInventory:number){
        this.idInventory=idInventory;
        this.serviceInventary.getAllId(this.idInventory).subscribe((inventoryId:any)=>{
            this.inventoryDialog=true;
            this.idInventory=inventoryId.equipment.id_cat_equipment;
            this.nameEquipament=inventoryId.equipment.equipment;
            this.totalNumberPeople=inventoryId.equipment.total_number_people;
        },(err)=>{
            console.log(err);
        });
    }

    deleteInventory(idInventory:number){
        this.serviceInventary.deleteInventory(idInventory).subscribe(()=>{
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: 'Inventory delete sucessful',
                showConfirmButton: false
              });
            this.getAllInventary();
        }, (err)=>{
            console.log(err);
        });
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

  loading: boolean = true;

  sizes: any = [];

  productDialog: boolean = false;

  @ViewChild('filter') filter!: ElementRef;


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

  openNew() {
      this.productDialog = true;
  }
  saveProduct() {
      this.productDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Reservation Created', life: 3000 });

  }

  cancelRecervation() {
      this.productDialog=false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reservation Cancel', life: 3000 });
 
  }
}
