import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from "../model/responseLogin";
import { catchError, debounceTime, delay, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ERROR_CONSTANTS } from 'src/app/core/errors/errors.const';
import { UserAuthenticated } from "../model/userAuthenticated";
import { AuthService } from "../../auth/auth.service";
import { API_ENDPOINTS } from "../../routes/api.endpoints";


@Injectable( {
  providedIn: 'root'
} )
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}


  loginSetUserAndRoles( emailIn: string, passwordIn: string ): Observable<ResponseLogin> {
    const response: ResponseLogin = { error: true, message: ERROR_CONSTANTS.API.ERROR };
    const { options, body } : any = this.getOptionAndBody( emailIn, passwordIn );
    return this.http.post( API_ENDPOINTS.AUTH.LOGIN, body, options )
      .pipe(
        delay(500),
        map( ( res: any ) => {
          response.error = res.status != 200;
          response.message = res.statusText; // todo cambiar por message una vez que cambie el back.
          const { user, token }: any = this.getUserAndToken( res.body.body );
          this.authService.setUser( user, token );
          return response;
        } ),
        catchError( e => {
          response.error = true;
          response.message += " => " + e.error?.error;
          return of( response );
        } )
      );
  }

  private getUserAndToken( res: any ): Object {
    try {
      const user: UserAuthenticated = {
        mail: res.client_data.email,
        name: res.client_data.name,
        lastname: res.client_data.lastname,
        username: res.client_data.username,
        rol: res.client_data.roles,
      };
      let token = `${ res.token_type } ${ res.access_token }`;
      return { user, token };
    } catch ( e ) {
      throw new Error("Error al intentar setear el usuario.")
    }
  }

  private getOptionAndBody( emailIn: string, passwordIn: string ): Object {
    const options = {
      observe: 'response' as const,
      responsegType: 'json' as const
    }
    const body = {
      email: emailIn,
      password: passwordIn,
    }
    return { options, body };
  }

}
