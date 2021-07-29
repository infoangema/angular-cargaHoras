import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Template } from '../../interfaces/template';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../../interfaces/user";
import { Project } from "../../interfaces/project";
import * as moment from 'moment';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  form: FormGroup;
  users: User[] = [];
  projects: Project[] = [];
  URLUSER: string = 'https://angema-hours-backend.herokuapp.com/users';
  URLPROJECT: string = 'https://angema-hours-backend.herokuapp.com/projects';
  URLRECORD: string = 'https://angema-hours-backend.herokuapp.com/records';

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      operador: ['', Validators.required],
      fecha: ['', Validators.required],
      horas: ['', Validators.required],
      proyecto: ['', Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.http.get(this.URLUSER)
      .subscribe((response: any) => {
        this.users = response;
      });
    this.http.get(this.URLPROJECT)
      .subscribe((response: any) => {
        this.projects = response;
      });
  }

  newData() {
    const template: Template = {
      date: this.form.value.fecha,
      hours: this.form.value.horas,
      description: this.form.value.descripcion,
      user: this.form.value.operador,
      project: this.form.value.proyecto
    }
    this.postData(template);
    this.router.navigate(['/resultado']);
    this._snackBar.open('El dato fue ingresado correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  postData(template: Template) {
    if (!this.form.valid) {
      return console.log("Formulario Invalido");
    }
    let today = moment(template.date).format('DD-MM-YYYY');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const record: Template = {
      date: today,
      hours: template.hours,
      description: template.description,
      user: template.user,
      project: template.project
    };
    this.http.post(this.URLRECORD, JSON.stringify(record), {headers: headers})
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}

