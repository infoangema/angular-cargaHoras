import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app.routing';
import { FooterComponent } from './components/footer/footer.component';
import { NoopAnimationsModule, } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { ResultComponent } from './components/result/result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { SpinnerCircularModule } from "spinners-angular/spinner-circular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ModalDeleteComponent } from "./components/modal-delete/modal-delete.component";
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { SafePipe } from './safe.pipe';
import { CoreModule } from "./core/core.module";
import { HeaderComponent } from "./components/header/header.component";
import { LoginModule } from "./core/login/login.module";
import { AuthGuard } from "./core/auth/auth.guard";

@NgModule( {
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
        ResultComponent,
        ContactComponent,
        ModalDeleteComponent,
        ModalGenericComponent,
        StatisticsComponent,
        ModalLoginComponent,
        SafePipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NoopAnimationsModule,
        SharedModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerCircularModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        AppRoutingModule,
        LoginModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})

export class AppModule { }
