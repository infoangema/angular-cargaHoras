import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Planilla } from '../../interfaces/planilla';
import { PlanillasService } from '../../services/planillas.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  form: FormGroup;
  users: any[] = [];
  projects: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private _plantillaService: PlanillasService, private router:Router, private _snackBar: MatSnackBar) {

    this.http.get('http://localhost:8084/users')
      .subscribe((response: any) => {
          this.users = response;
      });

    this.http.get('http://localhost:8084/projects')
      .subscribe((response: any) => {
        this.projects = response;
      });

    this.form = this.fb.group({
      operador:['', Validators.required],
      fecha:['', Validators.required],
      horas:['', Validators.required],
      proyecto:['', Validators.required],
      descripcion:[''],
    })
   }

  enviarDatos() {
      this.http.post('http://localhost:8084/records', this.form.value)
        .subscribe((response: any) => {
      console.log("Datos Enviados Exitosamente.");
    });
  }

  ngOnInit(): void {}

  agregarDato(){

    const planilla: Planilla = {
      operador: this.form.value.operador,
      fecha: this.form.value.fecha,
      horas: this.form.value.horas,
      proyecto: this.form.value.proyecto,
      descripcion: this.form.value.descripcion,
    }
    this._plantillaService.agregarUsuario(planilla);
    this.router.navigate(['/resultado']);
    this._snackBar.open('El dato fue ingresado correctamente','',{
      duration:1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}

