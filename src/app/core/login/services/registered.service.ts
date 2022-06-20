import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ResponseLogin} from "../model/responseLogin";
import {catchError, map} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { ERROR_CONSTANTS } from "../../errors/errors.const";
import { AuthService } from "../../auth/auth.service";
import { ENDPOINTS_API } from "../../routes/api.routes";




@Injectable( {
  providedIn: 'root'
} )
export class RegisteredService {
  constructor (    private http: HttpClient,
                   private authService: AuthService,

  ){}

  login( emailIn: string, passwordIn: string, nameIn: string, ): Observable<ResponseLogin> {
    const response: ResponseLogin = { error: true, message: ERROR_CONSTANTS.API.ERROR };
    //@ts-ignore
    const { options, body } = this.getOptionAndBody( emailIn, passwordIn );
    return this.http.post( ENDPOINTS_API.AUTH.LOGIN, body, options )
      .pipe(
        map( ( res: any ) => {
          response.error = res.status != 200;
          response.message = res.statusText; // todo cambiar por message una vez que cambie el back.
          //@ts-ignore
          const { user, token } = this.getUserAndToken( res );
          this.authService.setUser( user, token );
          return response;
        } ),
        catchError( e => {
          return of( response );
        } )
      );
  }
}
