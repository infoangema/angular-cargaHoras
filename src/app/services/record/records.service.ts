import { Injectable, ViewChild } from '@angular/core';
import { Record } from '../../interfaces/record';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  listRecord: Record[] = [];
  URL: string = 'https://angema-hours-backend.herokuapp.com/records';
  dataSource!: MatTableDataSource <any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }
}
