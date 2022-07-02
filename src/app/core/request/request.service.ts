import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TimeoutError } from 'rxjs/internal/util/TimeoutError';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Utils } from "../util/utils";
import { ENDPOINTS_API } from "../routes/api.routes";
import { LocalStorageService } from "../storage/local-storage.service";


export interface HttpClientOptions {
  headers?: { [key: string]: string | number | null } | null;
  params?: { [key: string]: string | number } | null;
  body?: { [key: string]: any } | null;
  config?: {
    bodyType?: 'json' | 'formData', // Default json
    retry?: number; // Default 0
  };
  responseType?: 'json' | 'text'; // Default 'json'
}

@Injectable()
export class RequestService {
  defaultOptions: HttpClientOptions;

  constructor( private httpClient: HttpClient, private localStorageService: LocalStorageService ) {
    const token = this.localStorageService.getItem( "token" );
    this.defaultOptions = {
      headers: {
        'content-Type': 'application/json; charset=utf-8',
        'Authorization': `${ token }`,
      },
      params: {},
      body: {},
      config: {
        bodyType: 'json',
        retry: 0
      },
      responseType: 'json'
    };
  }

  public get<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.xhr( 'get', resource, options );
  }

  public post<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.xhr( 'post', resource, options );
  }

  public put<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.xhr( 'put', resource, options );
  }

  public delete<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.xhr( 'delete', resource, options );
  }

  public patch<T>( resource: string, options?: HttpClientOptions ): Observable<T> {
    return this.xhr( 'patch', resource, options );
  }

	private xhr<T>(method: string, resource: string, newOptions?: HttpClientOptions): Observable<T> {
		const options = this.prepareHttpClientOptions(this.defaultOptions, newOptions);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearre` });
    let options2 = { headers: headers };
		// Si se envia "http" significa que es absoluta, de otra manera concatena la api con el resource
		const endpoint = resource.substring(0, 4) === 'http' ? resource : `${ENDPOINTS_API.RESOURCES.GLOBAL}${resource}`;
		return this.httpClient.request<T>(method, endpoint, options2)
		.pipe(
			timeout(environment.httpTimeout),
			retry(environment.retry),
			// @ts-ignore
			catchError((err: any, caught: Observable<any>): ObservableInput<any> => {
//				if (err instanceof TimeoutError) {
//					console.log('Error de timeout', err);
//				}
          if ( err.status === 400 ) {
            console.log( 'Error de Validación de datos', 'volver a intentar' );
          }
          if ( err.status === 403 ) {
            console.log( 'Forbidden', 'volver a intentar' );
          }
          if ( err.status === 404 ) {
            console.log( 'Bad request' );
            throw new Error( 'error' );
          }
          if ( err.status === 429 ) {
            console.log( 'Has sido bloqueado', 'Volver' );
          } else if ( err.status === 500 ) {
            console.log( 'Error de servidor', 'Volver a intentar' );
            throw new Error( err.message );
          } else {
            if ( err.message ) {
              console.log( err.message );
              throw new Error( err.message );
            }
            if ( err.error!.message ) {
              console.log( err.error.message );
              throw new Error( err.error.message );
            }
          }
        } )
      );
  }

	/**
	 * Para borrar un header, enviar con value en `null`
	 */
	private setHeaders(optionsMerged: any) {
		let headers = new HttpHeaders();
		Object.keys(optionsMerged.headers).forEach((key) => {
			if (optionsMerged.headers[key] !== null) {
				headers = headers.append(key, optionsMerged.headers[key]);
			}
		});

    return headers;
  }

  private setHeaders2() : HttpHeaders {
    const headers = new HttpHeaders(
      {
        'content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer`
      }
    );
    return headers;
  }

	private prepareHttpClientOptions(previousOptions: HttpClientOptions, newOptions?: HttpClientOptions): any {
		const optionsMerged: any = {};

		const options: HttpClientOptions = Utils.mergeDeep(previousOptions, newOptions);

		optionsMerged.headers = this.setHeaders(options);
		optionsMerged.params = options.params;
		if (options.config!.bodyType === 'json') {
			optionsMerged.body = Utils.isEmpty(options.body) ? undefined : options.body;
		} else {
			// just for formData, you need to send the reference, merged does not work
			if (newOptions!.body) {
				optionsMerged.body = newOptions!.body;
			}
		}
		optionsMerged.responseType = options.responseType;

		return {
			optionsMerged,
			config: options.config
		};
	}
}
