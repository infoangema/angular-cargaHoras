import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/shared/shared.module';

import { NotRegisteredDialogComponent } from './not-registered-dialog.component';

describe('NotRegisteredDialogComponent', () => {
  let component: NotRegisteredDialogComponent;
  let fixture: ComponentFixture<NotRegisteredDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotRegisteredDialogComponent],
      imports: [RouterTestingModule, SharedModule, TranslateModule.forRoot()],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotRegisteredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
