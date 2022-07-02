import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ENDPOINTS_API } from "../core/routes/api.routes";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URLUSER: string = ENDPOINTS_API.RESOURCES.USER;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.URLUSER);
  }
}
