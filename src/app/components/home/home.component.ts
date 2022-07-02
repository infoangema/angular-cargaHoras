import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from "../../interfaces/user";
import { Project } from "../../interfaces/project";
import { Record } from "../../interfaces/record";
import * as moment from 'moment';
import { UserService } from "../../services/user.service";
import { ProjectService } from "../../services/project.service";
import { RecordService } from "../../services/record.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalGenericComponent } from "../modal-generic/modal-generic.component";
import { HttpService } from "../../core/request/http.service";
import { ENDPOINTS_API } from "../../core/routes/api.routes";

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
  loadingProject: boolean;

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private projectService: ProjectService,
    private recordService: RecordService )
  {
    this.form = this.fb.group( {
      operador: [ '' ],
      fecha: [ '' ],
      horas: [ '' ],
      proyecto: [ '' ],
      descripcion: [ '' ]
    } );
    this.loadingUser = true;
    this.loadingProject = true;
  }

  ngOnInit(): void {
    this.httpService.get(ENDPOINTS_API.RESOURCES.USER).subscribe( response => {
      this.users = response;
      this.loadingUser = false;
    } );
    this.projectService.getProject().subscribe( response => {
      this.projects = response;
      this.loadingProject = false;
    } );
  }

  disabledButton( form: UntypedFormGroup ): boolean {
    return ( form.value.operador.length != '' && form.value.fecha != '' && form.value.horas != '' && form.value.proyecto != '' );
  }

  newData() {
    const template: Record = {
      date: this.form.value.fecha,
      hours: this.form.value.horas,
      description: this.form.value.descripcion,
      user: this.form.value.operador,
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
