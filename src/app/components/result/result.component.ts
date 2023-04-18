import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from "@angular/material/table";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RecordService } from "../../services/record.service";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { MatDialog } from "@angular/material/dialog";
import { HttpWrapperService } from "../../core/request/http-wrapper.service";
import { API_ENDPOINTS } from "../../core/routes/api.endpoints";
import { AuthUserService } from "../../core/auth/auth-user.service";
import { GlobalResponse, Project, User, Record } from "../../core/login/model/userAuthenticated";
import { LoadingService } from "../../core/loading/loading.service";
import { BehaviorSubject } from "rxjs";

@Component( {
  selector: 'app-resultado',
  templateUrl: './result.component.html',
  styleUrls: [ './result.component.css' ]
} )

export class ResultComponent implements OnInit {

  displayedColumns: string[] = [ 'date', 'hours', 'user', 'project', 'description', 'id' ];
  listRecord: Record[] = [];
  //@ts-ignore
  user: User;
  projects: Project[] = [];
  form: UntypedFormGroup;
  dataSource!: MatTableDataSource<any>;
  appliedFilter: boolean;

  @ViewChild( MatPaginator ) paginator!: MatPaginator;
  @ViewChild( MatSort ) sort!: MatSort;
  public actualizar: boolean = true;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    public recordService: RecordService,
    private httpService: HttpWrapperService,
    private authService: AuthUserService,
    private loadingService: LoadingService
  ) {
    this.form = this.fb.group( {
      fechaDesde: null,
      fechaHasta: null,
      operador: null,
      proyecto: null
    } );
    this.appliedFilter = false;
  }

  ngOnInit() {
    this.loadingService.tryToStopLoading();
    this.loadTable();
    this.recordService.listRecordObs.subscribe( result => {
      this.dataSource = new MatTableDataSource( result );
    })
  }

  loadTable(): void {

    //@ts-ignore
    this.user = this.authService.user;
    this.httpService.get(API_ENDPOINTS.RESOURCES.PROYECTOS).subscribe( ( response: any) => {
      this.projects = this.authService.getUser().projects;
    } );
    this.recordService.getRecodsByUserId(this.user.id).subscribe( ( response: GlobalResponse) => {
      this.listRecord = response.body;
      for ( let i = 0; i < this.listRecord.length; i++ ) {
        this.listRecord[i].visible = true;
      }
//      this.listRecord.reverse();
      this.dataSource = new MatTableDataSource( this.listRecord );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } );
  }

  deleteData( index: number ) {
    const dialogRef = this.dialog.open( ModalDeleteComponent, { data: this.stringDataArray( this.listRecord.find( element => element.id == index )! ) } );
    dialogRef.afterClosed().subscribe( response => {
      if ( response ) {
        this.recordService.deleteRecord( index ).subscribe( response => {
          console.log( response );
          this.loadTable();
          this._snackBar.open( 'Dato eliminado exitosamente.', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          } )
        } );
      }
    } );
  }

  stringDataArray( record: Record ): string[] {
    let dataString: string[] = [];
    if ( record != undefined ) {
      dataString.push( 'Fecha: ' + record.date );
      dataString.push( 'Hora: ' + record.hours );
      //@ts-ignore
      dataString.push( 'Operador: ' + record.user.name + ' ' + record.user.surname );
      dataString.push( 'Proyecto: ' + record.project.name );
      dataString.push( 'Description: ' + record.description );
      return dataString;
    }
    dataString.push( "Null" );
    return dataString;
  }

  filter() {
    this.recordService.filter( this.form ).subscribe( response => {
      this.listRecord = response;
      for ( let i = 0; i < this.listRecord.length; i++ ) {
        this.listRecord[i].visible = true;
      }
      this.listRecord.reverse();
      this.dataSource = new MatTableDataSource( this.listRecord );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.appliedFilter = true;
    } );
  }

  reset() {
    this.form.reset();
    if ( this.appliedFilter ) {
      this.loadTable();
      this.appliedFilter = false;
    }
  }
}
