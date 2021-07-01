import { Injectable } from '@angular/core';
import { Planilla } from '../interfaces/planilla';

@Injectable({
  providedIn: 'root'
})
export class PlanillasService {

  listPlantilla: Planilla[] = [
   
    
    
  ];

  constructor() { }

  getPlantilla(){
    return this.listPlantilla.slice();
  }

  eliminarDato(index:number){
    this.listPlantilla.splice(index, 1);

  }
  agregarUsuario(plantilla: Planilla){
    this.listPlantilla.unshift(plantilla);
  }
}
