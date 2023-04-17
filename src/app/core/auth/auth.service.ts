import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from '../storage/local-storage.service';
import { AuthDto, Company, Project, UserResponse } from "../login/model/userAuthenticated";
import { NgxPermissionsService } from 'ngx-permissions';


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  public currenUser: BehaviorSubject<AuthDto | null>;
  //@ts-ignore
  public userProjects: BehaviorSubject<Project[] | null>;
  //@ts-ignore
  public userCompany: BehaviorSubject<Company | null>;
  public user: UserResponse | undefined;

  constructor(
    private permissionsService: NgxPermissionsService,
    private localStorageService: LocalStorageService,
  ) {
    this.currenUser = new BehaviorSubject(
      this.localStorageService.getItem( 'currentUser' )
    );
    const perm = ["ROLE_ADMIN", "ROLE_DEV"];
    this.permissionsService.loadPermissions(perm);
  }

  public setToken( token: string ): void {
    this.localStorageService.setItem('token', token);
  }

  public setAuth( user: AuthDto ): void {
    this.localStorageService.setItem( 'authUser', user );
    let roles: string[] = user.roles.map( rol => rol.descripcion);
    this.permissionsService.loadPermissions(roles);
  }

  public setUser( user: UserResponse ): void {
    this.localStorageService.setItem( 'currentUser', user );
    this.user = user;
    this.currenUser = new BehaviorSubject(
      this.localStorageService.getItem( 'currentUser' )
    );
    //@ts-ignore
    this.userProjects = new BehaviorSubject(user.projects);
    //@ts-ignore
    this.userCompany = new BehaviorSubject(user.projects[0].company);
  }

  public getUser() {
    return this.currenUser.value;
  }

}
