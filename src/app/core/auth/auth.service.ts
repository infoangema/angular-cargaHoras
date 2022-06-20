import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from '../storage/local-storage.service';
import { UserAuthenticated } from "../login/model/userAuthenticated";


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  public currenUser: BehaviorSubject<UserAuthenticated | null>;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.currenUser = new BehaviorSubject(
      this.localStorageService.getItem( 'currentUser' )
    );
  }

  public setUser( user: UserAuthenticated, token: string ): void {
    this.localStorageService.setItem( 'currentUser', user );
    this.localStorageService.setItem('token', token);
    this.currenUser = new BehaviorSubject(
      this.localStorageService.getItem( 'currentUser' )
    );
  }

  public getUser() {
    return this.currenUser.value;
  }
}
