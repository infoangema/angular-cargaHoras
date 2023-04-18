import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UntypedFormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";
import { DateAdapter } from "@angular/material/core";
import { API_ENDPOINTS } from "../core/routes/api.endpoints";
import { HttpWrapperService } from "../core/request/http-wrapper.service";
import { GlobalResponse, Record } from "../core/login/model/userAuthenticated";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private RECORDS: string = API_ENDPOINTS.RESOURCES.RECORDS;
  listRecordObs: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);

  constructor( private httpWrapperService: HttpWrapperService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  getRecodsByUserId(id?: number): Observable<any> {
    return this.httpWrapperService.get(`${this.RECORDS}/read/by-user-id/${id}`);
  }

  postRecord(record: Record, idUser?: number): Observable<any> {
    return this.httpWrapperService.post<GlobalResponse>(`${this.RECORDS}/create/by-user-id/${idUser}`, JSON.stringify(record)).pipe(
      tap( res => {
        this.listRecordObs.next(res.body);
      })
    );
  }

  deleteRecord(id: number): Observable<any> {
    return this.httpWrapperService.delete(`${this.RECORDS}/delete/${id}`);
  }

  statistics():Observable<any> {
    return this.httpWrapperService.get(this.RECORDS + '/statistics');
  }

  filter(form: UntypedFormGroup): Observable<any> {
    let URLFILTER: string = this.RECORDS + '/filter?';
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
    return this.httpWrapperService.get(URLFILTER);
  }
}
