import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { Record } from "../../interfaces/record";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RecordService } from "../../services/record.service";

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

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private fb: FormBuilder, private recordService: RecordService) {
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
    this.http.get(this.recordService.getURL())
      .subscribe((response: any) => {
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
    this.http.delete(this.recordService.getURL() + '/' + index)
      .subscribe((response: any) => {
        console.log(response);
        this.loadTable();
      });
    this._snackBar.open('Dato eliminado exitosamente', '',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
