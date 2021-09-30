import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Record } from "../../interfaces/record";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RecordService } from "../../services/record.service";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { ProjectService } from "../../services/project.service";
import { User } from "../../interfaces/user";
import { Project } from "../../interfaces/project";

@Component({
  selector: 'app-resultado',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  displayedColumns: string[] = ['date', 'hours', 'user', 'project', 'description', 'id'];
  listRecord: Record[] = [];
  users: User[] = [];
  projects: Project[] = [];
  form: FormGroup;
  dataSource!: MatTableDataSource <any>;
  loadingUser: boolean;
  loadingProject: boolean;
  loadingRecord: boolean;
  appliedFilter: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder, private recordService: RecordService,
              private userService: UserService, private projectService: ProjectService) {
    this.form = this.fb.group({
      fechaDesde: null,
      fechaHasta: null,
      operador: null,
      proyecto: null
    });
    this.loadingRecord = true;
    this.loadingUser = true;
    this.loadingProject = true;
    this.appliedFilter = false;
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      this.loadingUser = false;
    });
    this.projectService.getProject().subscribe(response => {
      this.projects = response;
      this.loadingProject = false;
    });
    this.recordService.getRecods().subscribe(response => {
      this.listRecord = response;
      for(let i=0;i<this.listRecord.length;i++) {
        this.listRecord[i].visible = true;
      }
      this.listRecord.reverse();
      this.dataSource = new MatTableDataSource(this.listRecord);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingRecord = false;
    });
  }

  deleteData(index: number) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {data: this.stringDataArray(this.listRecord.find(element => element.id == index)!)});
    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.recordService.deleteRecord(index).subscribe(response => {
          console.log(response);
          this.loadTable();
          this._snackBar.open('Dato eliminado exitosamente.', '',{
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        });
      }
    });
  }

  stringDataArray(record: Record): string[] {
    let dataString: string[] = [];
    if (record != undefined) {
      dataString.push('Fecha: ' + record.date);
      dataString.push('Hora: ' + record.hours);
      dataString.push('Operador: ' + record.user.name + ' ' + record.user.surname);
      dataString.push('Proyecto: ' + record.project.name);
      dataString.push('Description: ' + record.description);
      return dataString;
    }
    dataString.push("Null");
    return dataString;
  }

  filter() {
    this.recordService.filter(this.form).subscribe(response => {
      this.listRecord = response;
      for(let i=0;i<this.listRecord.length;i++) {
        this.listRecord[i].visible = true;
      }
      this.listRecord.reverse();
      this.dataSource = new MatTableDataSource(this.listRecord);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingRecord = false;
      this.appliedFilter = true;
    });
  }

  disabledButton(): boolean {
    return !(this.form.value.fechaDesde || this.form.value.fechaHasta || this.form.value.operador || this.form.value.proyecto);
  }

  reset() {
    this.form.reset();
    if(this.appliedFilter) {
      this.loadTable();
      this.appliedFilter = false;
    }
  }
}
