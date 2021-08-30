import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  URLPROJECT: string = 'https://hours-backend-pruebas.herokuapp.com/projects';

  constructor() { }

  getURL(): string {
    return this.URLPROJECT;
  }
}
