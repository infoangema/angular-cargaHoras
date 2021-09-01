import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URLPROJECT: string = 'https://hours-backend-pruebas.herokuapp.com/projects';

  constructor(private http: HttpClient) { }

  getProject(): Observable<any> {
    return this.http.get(this.URLPROJECT);
  }
}
