import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

import { AuthFacade } from '@app/core/auth/auth.facade';
import { UserDocumentType } from '@app/core/user-information/models/user-document-type.model';
import { UserInformationService } from '@app/core/user-information/user-information.service';
import { LoadingService } from '@app/core/loading/loading.service';

import { NotRegisteredDialogComponent } from '../not-registered-dialog/not-registered-dialog.component';

@Component({
  selector: 'ce-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})

// agregue el type undefined para que no se pueda usar el componente en el html
export class LoginFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<boolean>();

  userDocumentTypes$: Observable<UserDocumentType[]> | undefined;
  loginForm: FormGroup | undefined;
  hidePassword = true;

  //
  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private userInformationService: UserInformationService,
    private loadingService: LoadingService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.buildForm();

    this.userDocumentTypes$ = this.userInformationService.getDocumentTypes();
  }

  buildForm(): FormGroup {
    const form = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
    // agregue " ! " para que elimine null
    form
      .get('documentType')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => form.get('documentNumber')!.reset());

    return form;
  }

  onLoginClick(): void {
    this.loginForm!.markAllAsTouched();

    if (this.loginForm!.valid) {
      return;
    }
    // agregue " ! " para que elimine null
    this.loadingService.toggleLoading();

    this.authFacade
      .login(
        this.loginForm!.value.documentType,
        this.loginForm!.value.documentNumber,
        this.loginForm!.value.password
      )
      .pipe(
        tap(() => this.loadingService.toggleLoading()),
        take(1)
      )
      .subscribe((loginResponse: any) => {
        if (loginResponse) {
          this.router.navigate(['/home']);
        } else {
          this.dialog.open(NotRegisteredDialogComponent, {
            restoreFocus: false,
          });
        }
      });
  }

  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
