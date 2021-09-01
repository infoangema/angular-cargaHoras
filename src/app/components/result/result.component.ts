import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Record } from "../../interfaces/record";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RecordService } from "../../services/record.service";
import { ModalComponent } from "../modal/modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-resultado',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  displayedColumns: string[] = ['date', 'hours', 'user', 'project', 'description', 'id'];
  listRecord: Record[] = [];
  form: FormGroup;
  loadingRecord: boolean;
  dataSource!: MatTableDataSource <any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder, private recordService: RecordService) {
    this.form = this.fb.group({
      operador: null,
      proyecto: null
    });
    this.loadingRecord = true;
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable(): void {
    this.recordService.getRecods().subscribe(response => {
      this.listRecord = response;
      for(let i=0;i<this.listRecord.length;i++) {
        this.listRecord[i].visible = true;
      }
      this.dataSource = new MatTableDataSource(this.listRecord);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingRecord = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteData(index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {data: this.stringDataArray(this.listRecord.find(element => element.id == index)!)});
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
}
