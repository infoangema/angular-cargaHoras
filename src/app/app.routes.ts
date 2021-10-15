import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { ContactComponent } from "./components/contact/contact.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { LoginComponent } from "./components/login/login.component";

const APP_ROUTES: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactComponent},
  { path: 'resultado', component: ResultComponent},
  { path: 'estadistica', component: StatisticsComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'login'},

];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class APP_ROUTING { }
