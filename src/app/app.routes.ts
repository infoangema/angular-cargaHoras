import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { ContactComponent } from "./components/contact/contact.component";

const APP_ROUTES: Routes = [

{ path: 'home', component: HomeComponent },
{ path: 'contacto', component: ContactComponent},
{ path: 'resultado', component: ResultComponent},

{ path: '**', pathMatch: 'full', redirectTo: 'home'},

];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class APP_ROUTING { }
