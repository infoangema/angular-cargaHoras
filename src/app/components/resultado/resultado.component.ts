import { Component, OnInit, ViewChild } from '@angular/core';
import { Planilla } from '../../interfaces/planilla';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlanillasService } from '../../services/planillas.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  listPlantilla: Planilla[] = [];
  

  displayedColumns: string[] = ['operador', 'fecha', 'horas', 'proyecto', 'descripcion', 'acciones'];
  dataSource!: MatTableDataSource <any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _plantillaService: PlanillasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarPlantilla();
  }

  cargarPlantilla(){
    this.listPlantilla = this._plantillaService.getPlantilla();
    this.dataSource = new MatTableDataSource(this.listPlantilla);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarDato(index: number){
    console.log(index);
    this._plantillaService.eliminarDato(index);
    this.cargarPlantilla();

    this._snackBar.open('Dato eliminado exitosamente', '',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    })

  }

}
