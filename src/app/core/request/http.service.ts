import { Injectable } from '@angular/core';
import { Observable, ObservableInput, TimeoutError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TimeoutError } from 'rxjs/internal/util/TimeoutError';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Utils } from "../util/utils";
import { API_ENDPOINTS } from "../routes/api.endpoints";
import { LocalStorageService } from "../storage/local-storage.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthUserService } from "../auth/auth-user.service";


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
export class HttpService {
  defaultOptions: HttpClientOptions;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private authServ: AuthUserService,
  ) {
    const token = this.localStorageService.getItem( "token" );
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
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

  private xhr<T>( method: string, resource: string, newOptions?: HttpClientOptions ): Observable<T> {
    const options = this.prepareHttpClientOptions( this.defaultOptions, newOptions );
    const endpoint = resource.substring( 0, 4 ) === 'http' ? resource : `${ API_ENDPOINTS.RESOURCES.GLOBAL }${ resource }`;
    return this.httpClient.request<T>( method, endpoint, options.optionsMerged )
      .pipe(
        timeout( environment.httpTimeout ),
        retry( environment.retry ),
        // @ts-ignore
        catchError( ( err: any, caught: Observable<any> ): ObservableInput<any> => {
          if ( err instanceof TimeoutError ) {
            this.showMsg('El servidor no responde, intente nuevamente');
            throw new Error( 'error' );
          }
          if ( err.status === 400 ) {
           this.showMsg(err.error.error);
            throw new Error( err.error.error );
          }
          if ( err.status === 401 ) {
            this.showMsg('Error de autenticación, el usuario o password son incorrectos');
            this.authServ.logout();
            throw new Error( err.error.error);
          }
          if ( err.status === 403 ) {
            this.showMsg('No tiene permisos para realizar esta acción');
            throw new Error( err.error.error );
          }
          if ( err.status === 404 ) {
            this.showMsg('No se encontró el recurso');
            throw new Error( err.error.error );
          }
          if ( err.status === 429 ) {
            this.showMsg('Demasiadas solicitudes, intente nuevamente');
            throw new Error( err.error.error );
          }
          if ( err.status === 500 ) {
            this.showMsg('Error de servidor, intente nuevamente');
            throw new Error( err.error.error );
          } else {
            if ( err.message ) {
              this.showMsg(err.error.error);
              throw new Error( err.error.error );
            }
            if ( err.error!.error ) {
              console.log( err.error.error );
              throw new Error( err.error.error );
            }
          }
        } )
      );
  }

  private showMsg( elServidorNoRespondeIntenteNuevamente: string ): void {
    this._snackBar.open( elServidorNoRespondeIntenteNuevamente, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    } );
  }

  /**
   * Para borrar un header, enviar con value en `null`
   */
  private setHeaders( optionsMerged: any ) {
    let headers = new HttpHeaders();
    Object.keys( optionsMerged.headers ).forEach( ( key ) => {
      if ( optionsMerged.headers[key] !== null ) {
        headers = headers.append( key, optionsMerged.headers[key] );
      }
    } );

    return headers;
  }

  private prepareHttpClientOptions( previousOptions: HttpClientOptions, newOptions?: HttpClientOptions ): any {
    const optionsMerged: any = {};

    const options: HttpClientOptions = Utils.mergeDeep( previousOptions, newOptions );

    optionsMerged.headers = this.setHeaders( options );
    optionsMerged.params = options.params;
    if ( options.config!.bodyType === 'json' ) {
      optionsMerged.body = Utils.isEmpty( options.body ) ? undefined : options.body;
    } else {
      // just for formData, you need to send the reference, merged does not work
      if ( newOptions!.body ) {
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
