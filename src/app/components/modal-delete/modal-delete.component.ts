import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  ngOnInit(): void { }

  onClose(): void {
    this.dialogRef.close();
  }
}
