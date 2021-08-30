import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  URLCONTACT: string = 'https://angema-hours-backend.herokuapp.com/contacts';

  constructor() { }

  getURL(): string {
    return this.URLCONTACT;
  }
}
