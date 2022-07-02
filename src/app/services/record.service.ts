import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Record } from "../interfaces/record";
import { UntypedFormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";
import { DateAdapter } from "@angular/material/core";
import { ENDPOINTS_API } from "../core/routes/api.routes";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private URLRECORD: string = ENDPOINTS_API.RESOURCES.RECORDS;

  constructor(private http: HttpClient, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

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

  statistics():Observable<any> {
    return this.http.get(this.URLRECORD + '/statistics');
  }

  filter(form: UntypedFormGroup): Observable<any> {
    let URLFILTER: string = this.URLRECORD + '/filter?';
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    if(form.value.fechaDesde != null) {
      let dateFrom: string = JSON.stringify(form.value.fechaDesde);
      dateFrom = dateFrom.slice(1,11);
      URLFILTER += 'datefrom=' + formatDate(dateFrom, format, locale).split('/').join('-');
    }
    if(form.value.fechaHasta != null) {
      if (form.value.fechaDesde != null) {
        URLFILTER += '&';
      }
      let dateTo: string = JSON.stringify(form.value.fechaHasta);
      dateTo = dateTo.slice(1,11);
      URLFILTER += 'dateto=' + formatDate(dateTo, format, locale).split('/').join('-');
    }
    if(form.value.operador != null) {
      if (form.value.fechaHasta != null) {
        URLFILTER += '&';
      }
      URLFILTER += 'operator=' + form.value.operador.id;
    }
    if(form.value.proyecto != null) {
      if (form.value.operador != null) {
        URLFILTER += '&';
      }
      URLFILTER += 'project=' + form.value.proyecto.id;
    }
    console.log(URLFILTER);
    return this.http.get(URLFILTER);
  }
}
