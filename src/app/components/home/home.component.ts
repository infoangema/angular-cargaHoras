import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from "../../interfaces/project";
import { Record } from "../../interfaces/record";
import * as moment from 'moment';
import { RecordService } from "../../services/record.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalGenericComponent } from "../modal-generic/modal-generic.component";
import { HttpWrapperService } from "../../core/request/http-wrapper.service";
import { LoadingService } from "../../core/loading/loading.service";
import { AuthService } from "../../core/auth/auth.service";

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
} )

export class HomeComponent implements OnInit {

  form: UntypedFormGroup;
  users: any = [];
  projects: Project[] = [];
  loadingUser: boolean;
  isLoading: boolean;

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private httpService: HttpWrapperService,
    private recordService: RecordService,
    private loadingService: LoadingService)
  {
    this.form = this.fb.group( {
      operador: [ '' ],
      fecha: [ '' ],
      horas: [ '' ],
      proyecto: [ '' ],
      descripcion: [ '' ]
    } );
    this.loadingUser = true;
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.loadingService.tryToStartLoading();

    this.authService.userProjects.subscribe( ( response: any) => {
      this.projects = response;
      this.isLoading = false;
      this.loadingService.tryToStopLoading();
    } );
  }

  disabledButton( form: UntypedFormGroup ): boolean {
    return ( form.value.fecha != '' && form.value.horas != '' && form.value.proyecto != '' );
  }

  newData() {
    const template: Record = {
      date: this.form.value.fecha,
      hours: this.form.value.horas,
      description: this.form.value.descripcion,
      user: this.authService.user,
      project: this.form.value.proyecto
    }
    this.postData( template );
  }

  postData( template: Record ) {
    if ( !this.form.valid ) {
      return console.log( "Formulario Invalido" );
    }
    let today = moment( template.date ).format( 'DD-MM-YYYY' );
    const record: Record = {
      date: today,
      hours: template.hours,
      description: template.description,
      user: template.user,
      project: template.project
    };
    this.recordService.postRecord( record ).subscribe( response => {
      console.log( response );
      const dialogRef = this.dialog.open( ModalGenericComponent, { data: "¿Deseas seguir cargando registros?" } );
      dialogRef.afterClosed().subscribe( response => {
        if ( !response ) {
          this.router.navigate( [ '/resultado' ] );
        }
        this.form = this.fb.group( {
          operador: [ '' ],
          fecha: [ '' ],
          horas: [ '' ],
          proyecto: [ '' ],
          descripcion: [ '' ]
        } );
      } );
      this._snackBar.open( 'El dato fue ingresado correctamente', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      } );
    } );
  }
}
