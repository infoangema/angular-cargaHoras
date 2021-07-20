import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultadoComponent } from './components/result/resultado.component';

const APP_ROUTES: Routes = [

{ path: 'home', component: HomeComponent },
{ path: 'resultado', component: ResultadoComponent},

{ path: '**', pathMatch: 'full', redirectTo: 'home'},

];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class APP_ROUTING { }
