import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from "../util/utils";
import { HttpClientOptions, RequestService } from "./request.service";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable()
export class HttpService {
  constructor(
    private requestService: RequestService,
    private localStorageService: LocalStorageService,
  ) { }

  public get<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.requestService.get(resource, this.setOptions(options));
  }

  public post<T>(resource: string, _data?: any): Observable<T> {
    const info = {
      headers: {
        'responseType': 'json',
        'observe': 'response'
      },
      body: _data || ''
    };
    return this.requestService.post(resource, info);
  }

  public put<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.requestService.put(resource, this.setOptions(options));
  }

  public delete<T>(resource: string, options?: HttpClientOptions): Observable<T> {
/*    const auth = this.userProvider.isAuth();
    if (!auth) {
      return null;
    }*/
    return this.requestService.delete(resource, this.setOptions(options));
  }

  public patch<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: data
    };
    return this.requestService.patch(resource, this.setOptions(info));
  }

  public newPut<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: data
    };
    return this.requestService.put(resource, this.setOptions(info));
  }


  private setOptions(options?: HttpClientOptions): HttpClientOptions {
    return Utils.mergeDeep(options || {}, {
      headers: {
        Authorization: `${this.localStorageService.getItem('token')}`,
      }
    });
  }
}
