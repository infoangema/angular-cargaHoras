import { NgModule } from '@angular/core';
import { HttpWrapperService } from "./request/http-wrapper.service";
import { HttpService } from "./request/http.service";
import { RegexCommon } from "./regx/regex.service";
import { MaterialModule } from "./material/material.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule( {
  imports: [

    // material
    MaterialModule,
    // angular
    CommonModule,
    RouterModule,
    HttpClientModule,

    // material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    HttpWrapperService,
    HttpService,
    RegexCommon
  ],
} )
export class CoreModule {
}
