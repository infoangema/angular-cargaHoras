import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';

import { LoginRootComponent } from './components/login-root.component';
//import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [LoginRootComponent],
  imports: [
    SharedModule,
    LoginRoutingModule,
    CommonModule,
    MatCardModule,
    //  LoginComponent,
    MatDividerModule,
  ],
})
export class LoginModule {}
