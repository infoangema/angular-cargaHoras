import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseLogin} from "../model/responseLogin";
import {catchError, debounceTime, delay, map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {ERROR_CONSTANTS} from 'src/app/core/errors/errors.const';
import { AuthDto, Authresponse, GlobalResponse } from "../model/userAuthenticated";
import {AuthService} from "../../auth/auth.service";
import {API_ENDPOINTS} from "../../routes/api.endpoints";
import { HttpWrapperService } from "../../request/http-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpService: HttpWrapperService,
    private authService: AuthService,
  ) {
  }


  loginSetUserAndRoles(emailIn: string, passwordIn: string): Observable<ResponseLogin> {
    const response: ResponseLogin = {error: true, message: ERROR_CONSTANTS.API.ERROR};
    const {options, body}: any = this.getOptionAndBody(emailIn, passwordIn);
    return this.httpService.post<GlobalResponse>(API_ENDPOINTS.AUTH.LOGIN, body, options).pipe(
      switchMap((globalResponse: GlobalResponse) => {
        const userId = globalResponse.body.user_id;
        const {auth, token}: any = this.getAuthAndToken(globalResponse.body);
        this.authService.setAuth(auth);
        this.authService.setToken(token);
        return this.httpService.get<GlobalResponse>(`${API_ENDPOINTS.USER.USER_BY_ID}/${userId}`).pipe(
          map( (res: GlobalResponse) => {
            this.authService.setUser(res.body);
            response.error = false;
            response.message = 'OK';
            return response;
          })
        );
      })
    );
  }

  private getAuthAndToken(res: Authresponse): Object {
    try {
      const auth: AuthDto = {
        id: res.auth_data.id,
        active: res.auth_data.active,
        username: res.auth_data.username,
        roles: res.auth_data.roles,
      };
      let token = `${res.token_type} ${res.access_token}`;
      return {auth, token};
    } catch (e) {
      throw new Error("Error al intentar setear el usuario.")
    }
  }

  private getOptionAndBody(emailIn: string, passwordIn: string): Object {
    const options = {
      observe: 'response' as const,
      responsegType: 'json' as const
    }
    const body = {
      email: emailIn,
      password: passwordIn,
    }
    return {options, body};
  }

}
