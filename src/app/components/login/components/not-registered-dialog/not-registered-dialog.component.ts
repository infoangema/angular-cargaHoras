import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'ce-not-registered-dialog',
  templateUrl: './not-registered-dialog.component.html',
  styleUrls: ['./not-registered-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotRegisteredDialogComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<NotRegisteredDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  public closeMe() {
    this.dialogRef.close();
  }

  onCreateAccountClick() {
    this.router.navigate(['/create-account']);
    this.dialogRef.close();
  }
}
