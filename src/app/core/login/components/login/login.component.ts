import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from "../../model/responseLogin";
import { LoginService } from "../../services/login.service";
import { NotRegisteredDialogComponent } from "../not-registered-dialog/not-registered-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { tap } from "rxjs/operators";
import { LoginFormValues } from "../../model/loginFormValues";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../animations/route.animations";
import { LoadingService } from "../../../loading/loading.service";
import { INTERNAL_ROUTES } from "../../../routes/internal.routes";
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private router: Router) {}

  ngOnInit(): void {
    console.log("enter")
  }

  onCreateAccountClick(): void {
    this.router.navigate(['/create-account']);
  }

  public loginAndRedirect( data: LoginFormValues ): void {
    this.loginService.loginSetUserAndRoles( data.email, data.password )
      .pipe(tap(() => this.loadingService.toggleLoading()))
      .subscribe( ( loginResponse: ResponseLogin ) => {
        //@ts-ignore
          loginResponse.error ? this.showDialog(loginResponse.message) : this.router.navigateByUrl( INTERNAL_ROUTES.HOME );
        }
      );
  }

  private showDialog( message: string | undefined ): void {
    this.dialog.open( NotRegisteredDialogComponent, {
      width: '350px',
      data: message,
      restoreFocus: false
    } );
  }
}
