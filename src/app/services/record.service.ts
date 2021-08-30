import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  URLRECORD: string = 'https://hours-backend-pruebas.herokuapp.com/records';

  constructor() { }

  getURL(): string {
    return this.URLRECORD;
  }
}
