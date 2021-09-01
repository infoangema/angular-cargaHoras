import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URLUSER: string = 'https://hours-backend-pruebas.herokuapp.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.URLUSER);
  }
}
