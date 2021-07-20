import { Injectable } from '@angular/core';
import { Template } from '../interfaces/template';

@Injectable({
  providedIn: 'root'
})
export class PlanillasService {

  listPlantilla: Template[] = [

  ];

  constructor() { }

  getPlantilla(){
    return this.listPlantilla.slice();
  }

  eliminarDato(index:number){
    this.listPlantilla.splice(index, 1);

  }
  agregarUsuario(plantilla: Template){
    this.listPlantilla.unshift(plantilla);
  }
}
