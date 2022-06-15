import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRootComponent } from './components/login-root.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginRootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        data: { title: 'Ingresar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
