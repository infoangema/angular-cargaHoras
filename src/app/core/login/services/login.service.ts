import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from "../model/responseLogin";
import { catchError, debounceTime, delay, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ERROR_CONSTANTS } from 'src/app/core/errors/errors.const';
import { UserAuthenticated } from "../model/userAuthenticated";
import { AuthService } from "../../auth/auth.service";
import { ENDPOINTS_API } from "../../routes/api.routes";


@Injectable( {
  providedIn: 'root'
} )
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}


  login( emailIn: string, passwordIn: string ): Observable<ResponseLogin> {
    const response: ResponseLogin = { error: true, message: ERROR_CONSTANTS.API.ERROR };
    //@ts-ignore
    const { options, body } = this.getOptionAndBody( emailIn, passwordIn );
    return this.http.post( ENDPOINTS_API.AUTH.LOGIN, body, options )
      .pipe(
        delay(500),
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

  private getUserAndToken( res: any ): Object {
    const user: UserAuthenticated = {
      mail: res.body.name,
      name: res.body.name,
      surname: res.body.name,
      phone: res.body.name,
      rol: res.body.rol,
    };
    const token = 'Bearer asdfjhasdfjahdahdiauhdaidbadjbnakdjakdjhadlkjahdfakljdhfakjdhalkdfjhaldkfjahsdfkjahdfakjh';
    return { user, token };
  }

  private getOptionAndBody( emailIn: string, passwordIn: string ): Object {
    const options = {
      observe: 'response' as const,
      responsegType: 'json' as const,
    }
    const body = {
      mail: emailIn,
      password: passwordIn,
    }
    return { options, body };
  }

}
