import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { ContactComponent } from "./components/contact/contact.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { AuthGuard } from "./core/auth/auth.guard";
import {AdministrationComponent} from "./components/administration/administration.component";

const APP_ROUTES: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./core/login/login.module').then(( m) => m.LoginModule),
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactComponent, canActivate: [AuthGuard]},
  { path: 'resultado', component: ResultComponent, canActivate: [AuthGuard]},
  { path: 'estadistica', component: StatisticsComponent, canActivate: [AuthGuard]},
  { path: 'administracion', component: AdministrationComponent, canActivate: [AuthGuard]},

  { path: '**', pathMatch: 'full', redirectTo: 'auth/login'},

];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
