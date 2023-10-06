import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  arrayModules:any[]=new Array();

  constructor(){
    this.arrayModules=[
      {
        name:'Home',
        route:'th'
      },
      {
        name:'Rooms',
        route:'th'
      },
      {
        name:'Reception',
        route:'th'
      },
      {
        name:'Inventory',
        route:'th'
      },
      {
        name:'Payments',
        route:'th'
      },
      {
        name:'Laundry',
        route:'th'
      },
      {
        name:'Luggage',
        route:'th'
      },
      {
        name:'Logbook',
        route:'th'
      },
    ]
  }
}
