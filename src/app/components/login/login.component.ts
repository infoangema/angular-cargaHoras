import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { MatDialog } from "@angular/material/dialog";
import {ModalLoginComponent} from "../modal-login/modal-login.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  URLOGIN: string = 'https://angema-hours-back-pruebas.herokuapp.com/auth/login';
  email: string = '';
  password: string = '';

  constructor(public dialog: MatDialog, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {
  }

  login() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const user = {
      mail: this.email,
      password: this.password
    }
    this.http.post(this.URLOGIN, JSON.stringify(user), {headers: headers})
      .subscribe((response: any) => {
        this._snackBar.open('Usuario logeado correctamente.', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        if(response.body.user.message.status) {
          let dataString: string[] = [];
          dataString.push(response.body.user.message.url);
          dataString.push(response.body.user.message.message);
          dataString.push(response.body.user.message.dateTo);
          dataString.push(response.body.user.message.dateFrom);
          this.dialog.open(ModalLoginComponent, {data: dataString});
        } else {
          this.router.navigate(['/home']);
        }
    },err => {
        this._snackBar.open('Usuario o contraseña incorrecta.', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
    });
  }
}
