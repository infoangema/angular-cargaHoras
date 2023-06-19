import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from "../util/utils";
import { HttpClientOptions, HttpService } from "./http.service";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable()
export class HttpWrapperService {
  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
  ) { }

  public get<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.httpService.get<T>(resource, this.setOptions(options));
  }

  public post<T>(resource: string, _data?: any, options?:HttpClientOptions): Observable<T> {
    // @ts-ignore
    options.body = _data || '';
    // @ts-ignore
    options.headers = options.headers ?  options.headers : {
      'Content-Type': 'application/json; charset=utf-8',
      'responseType': 'json',
      'observe': 'response',
    };
    return this.httpService.post(resource, this.setOptions(options));
  }

  public put<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.httpService.put(resource, this.setOptions(options));
  }

  public delete<T>(resource: string, options?: HttpClientOptions): Observable<T> {
/*    const auth = this.userProvider.isAuth();
    if (!auth) {
      return null;
    }*/
    return this.httpService.delete(resource, this.setOptions(options));
  }

  public patch<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: data
    };
    return this.httpService.patch(resource, this.setOptions(info));
  }

  public newPut<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: data
    };
    return this.httpService.put(resource, this.setOptions(info));
  }


  private setOptions(options?: HttpClientOptions): HttpClientOptions {
    return Utils.mergeDeep(options || {}, {
      headers: {
        Authorization: `${this.localStorageService.getItem('token')}`,
      }
    });
  }
}
