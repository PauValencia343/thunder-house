import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  strEmail: string = '';
  strPassword: string = ''; 

  constructor(private _router: Router){

  }
  
  verifyUser(){
    if(this.strEmail == 'admin' && this.strPassword=='admin'){
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Correct user and password',
        showConfirmButton:false
      });
      this._router.navigateByUrl('th');
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verify user and password',
      })
    }
  }
}
