import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Planilla } from '../../interfaces/planilla';
import { PlanillasService } from '../../services/planillas.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder, private _plantillaService: PlanillasService, private router:Router, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      operador:['', Validators.required],
      fecha:['', Validators.required],
      horas:['', Validators.required],
      proyecto:['', Validators.required],
      descripcion:[''],

    })
   }

  ngOnInit(): void {
  }
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

