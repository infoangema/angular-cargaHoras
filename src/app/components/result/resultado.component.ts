import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TemplateService } from '../../services/template.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { Record } from "../../interfaces/record";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})

export class ResultadoComponent implements OnInit {

  displayedColumns: string[] = ['date', 'hours', 'user', 'project', 'description', 'id'];
  dataSource: Record[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private _plantillaService: TemplateService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.http.get('https://angema-hours-backend.herokuapp.com/records')
      .subscribe((response: any) => {
        this.dataSource = response;
      });
  }

  applyFilter(event: Event) {
    console.log(event);
  }

  deleteData(index: number){
    this.http.delete('https://angema-hours-backend.herokuapp.com/records/' + index)
      .subscribe((response: any) => {
        console.log(response);
      });
    this._snackBar.open('Dato eliminado exitosamente', '',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
