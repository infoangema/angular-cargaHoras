import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginRootComponent } from './components/login-root.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { NotRegisteredDialogComponent } from "./components/not-registered-dialog/not-registered-dialog.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegistrationFormComponent } from "./components/registration/registration-form/registration-form.component";
import { LoginFormComponent } from "./components/login/login-form/login-form.component";
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { AuthGuard } from "../auth/auth.guard";


@NgModule( {
  declarations: [
    LoginRootComponent,
    LoginComponent,
    LoginFormComponent,
    NotRegisteredDialogComponent,
    RegistrationComponent,
    RegistrationFormComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
  ],
  exports: [
    LoginRootComponent
  ],
  imports: [
    LoginRoutingModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [AuthGuard],
} )

export class LoginModule {
}
