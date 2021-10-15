import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordService } from "../../services/record.service";
import { Statistic_ext } from "../../interfaces/statistic_ext";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  displayedColumns: string[] = ['project', 'user', 'hours'];
  statistics: Statistic_ext[] = [];
  loadStatistics: boolean;
  index: number;
  dataSource!: MatTableDataSource <any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private recordService: RecordService) {
    this.loadStatistics = true;
    this.index = 0;
    this.loadTable();
  }

  ngOnInit(): void {
  }

  transformDate(data: Date): string {
    let dates: string[] = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    let month: number = 0;
    let year: number = 2021;
    let string_month = dates[month];
    return string_month + " del " + year;
  }

  loadTable(): void {
    this.recordService.statistics().subscribe(response => {
      this.statistics = response;
      this.loadStatistic();
      this.loadStatistics = false;
    });
  }

  loadStatistic(): void {
    this.dataSource = new MatTableDataSource(this.statistics);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.index++;
  }
}
