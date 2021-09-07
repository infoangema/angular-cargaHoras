import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';

// Rutas
import { APP_ROUTING } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ResultComponent,
    ContactComponent,
    ModalDeleteComponent,
    ModalGenericComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    NoopAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerCircularModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ModalDeleteComponent, ModalGenericComponent],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
