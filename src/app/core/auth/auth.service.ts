import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from '../storage/local-storage.service';
import { UserAuthenticated } from "../login/model/userAuthenticated";
import { NgxPermissionsService } from 'ngx-permissions';


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  public currenUser: BehaviorSubject<UserAuthenticated | null>;

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

  public setUser( user: UserAuthenticated, token: string ): void {
    this.localStorageService.setItem( 'currentUser', user );
    this.localStorageService.setItem('token', token);
    let roles: string[] = user.roles.map( rol => rol.description);
    this.permissionsService.loadPermissions(roles);
    this.currenUser = new BehaviorSubject(
      this.localStorageService.getItem( 'currentUser' )
    );
  }

  public getUser() {
    return this.currenUser.value;
  }
}
