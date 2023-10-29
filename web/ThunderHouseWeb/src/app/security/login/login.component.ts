import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  strEmail: string = '';
  strPassword: string = ''; 

  constructor(private _router: Router, private _serviceLogin:LoginService){

  }
  
  verifyUser(){
    this._serviceLogin.login(this.strEmail, this.strPassword).subscribe((resp)=>{
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Correct user and password',
        showConfirmButton:false
      });
      this._router.navigateByUrl('thunderhouse');
    }, (erro)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verify user and password',
      })
    });
  }
}
