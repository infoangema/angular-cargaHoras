import { Injectable } from '@angular/core';
import { Template } from '../interfaces/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  listPlantilla: Template[] = [

  ];

  constructor() { }

  agregarUsuario(plantilla: Template){
    this.listPlantilla.unshift(plantilla);
  }
}
