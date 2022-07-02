import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ENDPOINTS_API } from "../core/routes/api.routes";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URLPROJECT: string = ENDPOINTS_API.RESOURCES.PROJECT;

  constructor(private http: HttpClient) { }

  getProject(): Observable<any> {
    return this.http.get(this.URLPROJECT);
  }
}
