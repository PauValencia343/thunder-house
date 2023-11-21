import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  arrayModules:any[]=new Array();

  constructor(private _router: Router){
  }

  ngOnInit(): void {
    this.arrayModules=[
      {
        name:'Home',
        route:'thunderhouse'
      },
      {
        name:'Employees',
        route:'employeManagement'
      },
      {
        name:'Clients',
        route:'clientsManagement'
      },
      {
        name:'Rooms',
        route:'roomManagement'
      },
      {
        name:'Inventory',
        route:'inventoryManagement'
      },
      {
        name:'Users',
        route:'userManagement'
      },
      {
        name:'Supplie',
        route:'supplieManagement'
      },
      // {
      //   name:'Luggage',
      //   route:'leggageManagement'
      // },
      // {
      //   name:'Logbook',
      //   route:'logbookManagement'
      // },
    ]
    
  }

  goRoute(route:any){
    this._router.navigateByUrl(route);
  }
}
