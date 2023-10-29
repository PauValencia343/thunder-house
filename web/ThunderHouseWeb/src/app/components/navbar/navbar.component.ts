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
        name:'Rooms',
        route:'roomManagement'
      },
      {
        name:'Reception',
        route:'receptionManagement'
      },
      {
        name:'Inventory',
        route:'inventoryManagement'
      },
      // {
      //   name:'Payments',
      //   route:'th'
      // },
      // {
      //   name:'Laundry',
      //   route:'th'
      // },
      {
        name:'Luggage',
        route:'leggageManagement'
      },
      {
        name:'Logbook',
        route:'logbookManagement'
      },
    ]
    
  }

  goRoute(route:any){
    this._router.navigateByUrl(route);
  }
}
