import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder, FormControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { VALIDATION_MESSAGES } from "../../../consts/validations.const";
import { LoginFormValues } from "../../../model/loginFormValues";
import { LoadingService } from "../../../../loading/loading.service";

@Component( {
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ]
} )
export class LoginFormComponent implements OnInit {

  @Output() dataLoginEmitter = new EventEmitter();
  hidePassword = true;
  loginForm = new UntypedFormGroup( {} );
  public validationMessages = VALIDATION_MESSAGES;

  constructor(
    private fb: UntypedFormBuilder,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.loginForm.controls['remember'].valueChanges.subscribe(value => {
      if ( value ) {
        this.localStorageService.setItem( 'email', this.loginForm.controls['email'].value );
      } else {
        this.localStorageService.removeItem( 'remember' );
      }
    } );
  }

  buildForm(): void {
    // 120380.gepalet
    //gepalet@angema.com.ar
    this.loginForm = this.fb.group( {
      email: [ '', [ Validators.required ] ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength( 6 ),
          Validators.maxLength( 20 )
        ]
      ],
      remember: [ false ]
    } );
    //@ts-ignore
    // subscribe to form changes in remeber me


  }


  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }

  public getValidationFromControl( validation: any, elem: string ): any {
    //@ts-ignore
    return this.loginForm.get( elem ).hasError( validation.type ) && ( this.loginForm.get( elem ).dirty || this.loginForm.get( elem ).touched )
  }


  onLoginClick(): void {
    this.loadingService.toggleLoading();
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.emitDataForm();
  }

  private emitDataForm(): void {
    const formValueObj: LoginFormValues = this.loginForm.value;
    this.dataLoginEmitter.emit( formValueObj );
  }
}
