import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Contact } from "../../interfaces/contact";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ContactService } from "../../services/contact.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['name', 'company', 'mail', 'phone', 'description', 'viewed', 'id'];
  optionFilterColumns: string[] = ['Nombre', 'Empresa', 'Mail', 'Telefono', 'Descripcion'];
  dataSource!: MatTableDataSource <any>;
  listRecord: Contact[] = [];
  loading: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private contactService: ContactService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.contactService.getContacts().subscribe(response => {
      this.listRecord = response;
      this.dataSource = new MatTableDataSource(this.listRecord);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateViewed(data: Contact) {
    if (data.viewed == true) {
      data.viewed = false;
    } else {
      data.viewed = true;
    }
    this.contactService.updateViewed(data).subscribe(response => {
      console.log(response);
      this.loadTable();
    });
  }

  deleteData(index: number) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {data: this.stringDataArray(this.listRecord.find(element => element.id == index)!)});
    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.contactService.deleteContact(index).subscribe(response => {
          console.log(response);
          this.loadTable();
          this._snackBar.open('Dato eliminado exitosamente.', '',{
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        });
      }
    });
  }

  stringDataArray(contact: Contact): string[] {
    let dataString: string[] = [];
    if (contact != undefined) {
      dataString.push('Nombre: ' + contact.name);
      dataString.push('Empresa: ' + contact.company);
      dataString.push('Mail: ' + contact.mail);
      dataString.push('Telefono: ' + contact.phone);
      dataString.push('Descripcion: ' + contact.description);
      return dataString;
    }
    dataString.push("null");
    return dataString;
  }
}
