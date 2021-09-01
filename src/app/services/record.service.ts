import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Record } from "../interfaces/record";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private URLRECORD: string = 'https://hours-backend-pruebas.herokuapp.com/records';

  constructor(private http: HttpClient) { }

  getRecods(): Observable<any> {
    return this.http.get(this.URLRECORD);
  }

  postRecord(record: Record): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URLRECORD, JSON.stringify(record), {headers: headers});
  }

  deleteRecord(index: number): Observable<any> {
    return this.http.delete(this.URLRECORD + '/' + index);
  }
}
