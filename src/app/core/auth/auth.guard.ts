import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";
import { INTERNAL_ROUTES } from "../routes/internal.routes";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( private authService: AuthService, private router: Router ) {
    console.log("entro");
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getUser();
    if ( currentUser ) {
      return true;
    }
    this.router.navigate( [ INTERNAL_ROUTES.AUTH_LOGIN ], {
      queryParams: { returnUrl: state.url }
    } )
    return false;
//    return this.validate();
  }

  canLoad( route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate();
  }

  private validate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      return resolve(false)
    });
  }

}

