import {
  Component,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-not-registered-dialog',
  templateUrl: './not-registered-dialog.component.html',
  styleUrls: ['./not-registered-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotRegisteredDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<NotRegisteredDialogComponent>,
  ) {}

  cerrarPopUp(){
    this.dialogRef.close();
  }
}
