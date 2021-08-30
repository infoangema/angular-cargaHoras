import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  URLCONTACT: string = 'https://hours-backend-pruebas.herokuapp.com/contacts';

  constructor() { }

  getURL(): string {
    return this.URLCONTACT;
  }
}
