import { Component, Inject, OnInit, PipeTransform } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit, PipeTransform {

  constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<ModalDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  ngOnInit(): void { }

  onClose(): void {
    this.dialogRef.close();
  }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
