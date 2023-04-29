import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { Auth, Company, Project, User } from "../login/model/userAuthenticated";
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from "@angular/router";
import { INTERNAL_ROUTES } from "../routes/internal.routes";
import { LoadingService } from "../loading/loading.service";


@Injectable( {
  providedIn: 'root'
} )
export class AuthUserService {
  public auth: Auth | null = new Auth();

  public user: User = new User();
  public userProjects: Project[] = [];
  public userCompany: Company = new Company();

  constructor(
    private permissionsService: NgxPermissionsService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  public setToken( token: string ): void {
    this.localStorageService.setItem('token', token);
  }

  public setAuth( auth: Auth ): void {
    this.localStorageService.setItem( 'auth', auth );
    let roles: string[] = auth.roles.map( rol => rol.descripcion);
    this.permissionsService.loadPermissions(roles);
  }

  public getAuth(): Auth | null {
    this.auth = this.localStorageService.getItem( 'auth');
    return this.auth;
  }

  public setUser( user: User ): void {
    this.localStorageService.setItem( 'user', user );
    this.user = user;
    this.userProjects = this.user.projects;
    this.userCompany = this.user.projects[0].company;
  }

  public getUser(): User {
    //@ts-ignore
    this.user = this.localStorageService.getItem( 'user' );
    return this.user;
  }

  public logout(): void {
    this.localStorageService.clear();
    this.permissionsService.flushPermissions();
    // redirect to login
    this.loadingService.tryToStopLoading();
    this.router.navigate( [ INTERNAL_ROUTES.AUTH_LOGIN ] );
  }
}
