import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  URLPROJECT: string = 'https://angema-hours-backend.herokuapp.com/projects';

  constructor() { }

  getURL(): string {
    return this.URLPROJECT;
  }
}
