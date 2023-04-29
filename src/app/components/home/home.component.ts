import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { RecordService } from "../../services/record.service";
import { MatDialog } from "@angular/material/dialog";
import { HttpWrapperService } from "../../core/request/http-wrapper.service";
import { LoadingService } from "../../core/loading/loading.service";
import { AuthUserService } from "../../core/auth/auth-user.service";
import { Project, User } from "../../core/login/model/userAuthenticated";
import { Utils } from "../../core/util/utils";

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
} )

export class HomeComponent implements OnInit {

  form: UntypedFormGroup;
  users: any = [];
  projects: Project[] = [];
  isLoading: boolean;
  selectedDate = new Date();
  selectedProject: Project | undefined;
  user: User = new User();
  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authUserService: AuthUserService,
    private httpService: HttpWrapperService,
    private recordService: RecordService,
    private loadingService: LoadingService ) {
    this.user = this.authUserService.getUser();
    this.projects = this.user.projects;
    this.selectedProject = this.projects[0];
    this.form = this.setForm();
    this.isLoading = true;

  }

  private setForm(): UntypedFormGroup {
    return this.fb.group( {
      fecha: [ new Date() ],
      horas: [ '8' ],
      proyecto: [ this.selectedProject ],
      descripcion: [ '' ]

    } );
  }

  ngOnInit(): void {
    this.loadingService.tryToStartLoading();
    this.isLoading = false;
    this.loadingService.tryToStopLoading();
  }

  disabledButton( form: UntypedFormGroup ): boolean {
    return ( form.value.fecha != '' && form.value.horas != '' && form.value.proyecto != '' );
  }

  newData() {
    const template: any = {
      date: this.form.value.fecha,
      hours: this.form.value.horas,
      description: this.form.value.descripcion,
      user: this.user,
      project: this.form.value.proyecto
    }
    this.postData( template );
  }

  postData( template: any ) {
    if ( !this.form.valid ) {
      console.log( "Formulario Invalido" );
      return;
    }
//    let today = moment( template.date ).format( 'DD-MM-YYYY' );
    let today = Utils.getDateMoment(template.date);
    const record: any = {
      date: today,
      hours: template.hours,
      description: template.description,
      user: this.user,
      project: template.project,

    };
    this.recordService.postRecord( record, this.user.id ).subscribe( response => {
      this.form = this.setForm();
      this._snackBar.open( 'El dato fue ingresado correctamente', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      } );
    }/*, error => {
      this._snackBar.open( "Erorr: " + error.message, '', {
        duration: 5500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      } );
    }*/ );
  }

  public download(): void {
    //@ts-ignore
    this.recordService.downloadPDF(this.user.id);
  }

}
