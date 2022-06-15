import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../../core/animations/route.animations';

@Component({
  selector: 'ce-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCreateAccountClick(): void {
    this.router.navigate(['/create-account']);
  }
}
