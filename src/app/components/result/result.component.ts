import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Record } from "../../interfaces/record";
import { MatTableDataSource } from "@angular/material/table";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RecordService } from "../../services/record.service";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../interfaces/user";
import { Project } from "../../interfaces/project";
import { HttpWrapperService } from "../../core/request/http-wrapper.service";
import { API_ENDPOINTS } from "../../core/routes/api.endpoints";

@Component( {
  selector: 'app-resultado',
  templateUrl: './result.component.html',
  styleUrls: [ './result.component.css' ]
} )

export class ResultComponent implements OnInit {

  displayedColumns: string[] = [ 'date', 'hours', 'user', 'project', 'description', 'id' ];
  listRecord: Record[] = [];
  users: User[] = [];
  projects: Project[] = [];
  form: UntypedFormGroup;
  dataSource!: MatTableDataSource<any>;
  loadingUser: boolean;
  loadingProject: boolean;
  loadingRecord: boolean;
  appliedFilter: boolean;

  @ViewChild( MatPaginator ) paginator!: MatPaginator;
  @ViewChild( MatSort ) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    private recordService: RecordService,
    private httpService: HttpWrapperService
  ) {
    this.form = this.fb.group( {
      fechaDesde: null,
      fechaHasta: null,
      operador: null,
      proyecto: null
    } );
    this.loadingRecord = true;
    this.loadingUser = true;
    this.loadingProject = true;
    this.appliedFilter = false;
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable(): void {
    this.httpService.get(API_ENDPOINTS.RESOURCES.USER).subscribe( ( response: any) => {
      this.users = response.body;
      this.loadingUser = false;
    } );
    this.httpService.get(API_ENDPOINTS.RESOURCES.PROYECTOS).subscribe( ( response: any) => {
      this.projects = response;
      this.loadingProject = false;
    } );
    this.recordService.getRecods().subscribe( response => {
      this.listRecord = response;
      for ( let i = 0; i < this.listRecord.length; i++ ) {
        this.listRecord[i].visible = true;
      }
      this.listRecord.reverse();
      this.dataSource = new MatTableDataSource( this.listRecord );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingRecord = false;
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
      this.loadingRecord = false;
      this.appliedFilter = true;
    } );
  }

  disabledButton(): boolean {
    return !( this.form.value.fechaDesde || this.form.value.fechaHasta || this.form.value.operador || this.form.value.proyecto );
  }

  reset() {
    this.form.reset();
    if ( this.appliedFilter ) {
      this.loadTable();
      this.appliedFilter = false;
    }
  }
}
