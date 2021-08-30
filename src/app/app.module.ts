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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ResultComponent,
    ContactComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
