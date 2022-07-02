import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VALIDATION_MESSAGES } from "../../../consts/validations.const";
import { AuthService } from "../../../../auth/auth.service";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @Output() dataRegisterEmitter = new EventEmitter();
  public validationMessages = VALIDATION_MESSAGES;
  recordarme = false;
  registerForm = new UntypedFormGroup({});
  hidePassword = true;



  constructor(private authService: AuthService,
              private fb: UntypedFormBuilder,
              private router: Router,


  ) { }

  ngOnInit() {
    this.registerForm = this.buildForm(); }

  buildForm(): UntypedFormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      name: ['', Validators.required]

    });
    return form;
  }

  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }

  private isFormValid(): void {
    if ( !this.registerForm.valid ) {
      const errors: string[] = [];
      Object.keys( this.registerForm.controls ).forEach( ( k ) => {
        const control = this.registerForm.controls[k];
//        const errorMessages = this.validationMessages[k] as {
//          type: string;
//          message: string;
//        }[];
        if ( !control.errors ) {
          return;
        }

        Object.keys( control.errors ).forEach( ( e ) => {
//          const errorMessage = errorMessages.find( ( em ) => em.type === e );
//          errors.push( errorMessage.message );
        } );
      } );
    }
  }


  OnRegisterClick(): void {
    this.registerForm.markAsUntouched();
    this.isFormValid();
    const email =  this.registerForm.get( 'email' )?.value;
    const password = this.registerForm.get( 'password' )?.value;
    const name = this.registerForm.get( 'name' )?.value;
    this.dataRegisterEmitter.emit(
      {
        email: email,
        password: password,
        name: name,
      }
    );
  }




}
