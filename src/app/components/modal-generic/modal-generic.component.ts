import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataModalGeneric} from "../shared/DataModalGeneric.model";
import {HttpWrapperService} from "../../core/request/http-wrapper.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../core/storage/local-storage.service";

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.css']
})
export class ModalGenericComponent implements OnInit {

  public file: File | undefined;
  constructor(
    public dialogRef: MatDialogRef<ModalGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModalGeneric,
  ) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  fileChange($event: Event) {
    // @ts-ignore
    this.file = ($event.target as HTMLInputElement).files[0];
  }

  emitfile() {
    this.dialogRef.close(this.file);
  }
}
