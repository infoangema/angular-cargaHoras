import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component'
import { LoginRootComponent } from "./components/login-root.component";

const routes: Routes = [
  {
    path: '',
    component: LoginRootComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Ingresar' }
      },

      {
        path: 'register',
        component: RegistrationComponent,
        data: { title: 'Registro' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
