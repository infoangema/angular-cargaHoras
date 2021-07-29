import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RecordsService } from '../../services/record/records.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { Record } from "../../interfaces/record";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})

export class ResultadoComponent implements OnInit {

  displayedColumns: string[] = ['date', 'hours', 'user', 'project', 'description', 'id'];
  listRecord: Record[] = [];
  dataSource!: MatTableDataSource <any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private _recordsService: RecordsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.http.get('https://angema-hours-backend.herokuapp.com/records')
      .subscribe((response: any) => {
        this.listRecord = response;
        this.dataSource = new MatTableDataSource(this.listRecord);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteData(index: number) {
    this.http.delete('https://angema-hours-backend.herokuapp.com/records/' + index)
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
