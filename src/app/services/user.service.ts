import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URLUSER: string = 'https://hours-backend-pruebas.herokuapp.com/users';

  constructor() { }

  getURL(): string {
    return this.URLUSER;
  }
}
