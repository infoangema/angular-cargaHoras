import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from "../util/utils";
import { HttpClientOptions, RequestService } from "./request.service";

@Injectable()
export class PreRequestService {
  constructor(
    private http: RequestService,
  ) { }

  public get<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.http.get(resource, this.setOptions(options));
  }

  public post<T>(resource: string, _data?: any): Observable<T> {
    const info = {
      headers: {
        'responseType': 'json',
        'observe': 'response'
      },
      body: _data || ''
    };
    return this.http.post(resource, info);
  }

  public put<T>(resource: string, options?: HttpClientOptions): Observable<T> {
    return this.http.put(resource, this.setOptions(options));
  }

  public delete<T>(resource: string, options?: HttpClientOptions): Observable<T> {
/*    const auth = this.userProvider.isAuth();
    if (!auth) {
      return null;
    }*/
    return this.http.delete(resource, this.setOptions(options));
  }

  public patch<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'content-Type': 'application/json; charset=utf-8',
      },
      body: data
    };
    return this.http.patch(resource, this.setOptions(info));
  }

  public newPut<T>(resource: string, data: any): Observable<T> {
    const info = {
      headers: {
        'content-Type': 'application/json; charset=utf-8',
      },
      body: data
    };
    return this.http.put(resource, this.setOptions(info));
  }


  private setOptions(options?: HttpClientOptions): HttpClientOptions {
    return Utils.mergeDeep(options || {}, {
      headers: {
        Authorization: 'Bearer ',
      }
    });
  }
}
