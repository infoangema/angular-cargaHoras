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
import { environment } from "../../environments/environment";
import { HttpClientOptions } from "../core/request/http.service";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private GET_RECORDS_BY_ID: string = API_ENDPOINTS.RESOURCES.GET_RECORDS_BY_ID;
  private DELETE_RECORDS_BY_ID: string = API_ENDPOINTS.RESOURCES.DELETE_RECORDS_BY_ID;
  private CREATE_RECORDS_BY_ID: string = API_ENDPOINTS.RESOURCES.CREATE_RECORDS_BY_ID;
  private DOWNLOAD_PDF: string = API_ENDPOINTS.RESOURCES.DOWNLOAD_PDF;

  listRecordObs: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);

  constructor( private httpWrapperService: HttpWrapperService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  getRecodsByUserId(id?: number): Observable<any> {
    return this.httpWrapperService.get(`${this.GET_RECORDS_BY_ID}/${id}/find-records-for-current-user`);
  }

  postRecord(record: Record, idUser?: number): Observable<any> {
    return this.httpWrapperService.post<GlobalResponse>(`${this.CREATE_RECORDS_BY_ID}/${idUser}`, JSON.stringify(record)).pipe(
      tap( res => {
        this.listRecordObs.next(res.body);
      })
    );
  }

  deleteRecord(recordId: number, userId?: number): Observable<any> {
    return this.httpWrapperService.delete(`${this.DELETE_RECORDS_BY_ID}/delete/by-user-id/${userId}/record-id/${recordId}`);
  }

  statistics():Observable<any> {
    return this.httpWrapperService.get(this.GET_RECORDS_BY_ID + '/statistics');
  }

  filter(form: UntypedFormGroup): Observable<any> {
    let URLFILTER: string = this.GET_RECORDS_BY_ID + '/filter?';
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

  //descargar PDF
  public downloadPDF(id?:number) {
    //@ts-ignore
    let option: HttpClientOptions = { responseType: 'blob'}
    this.httpWrapperService.get(`${this.DOWNLOAD_PDF}/${id}`, option).subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}
