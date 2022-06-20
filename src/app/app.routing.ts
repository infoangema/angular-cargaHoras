import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { ContactComponent } from "./components/contact/contact.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";

const APP_ROUTES: Routes = [

//  { path: 'login', component: LoginPageComponent},
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/login/login.module').then(( m) => m.LoginModule),
  },
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactComponent},
  { path: 'resultado', component: ResultComponent},
  { path: 'estadistica', component: StatisticsComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'auth/login'},

];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
