import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Contact } from "../../interfaces/contact";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['name', 'company', 'mail', 'phone', 'description', 'viewed', 'id'];
  dataSource!: MatTableDataSource <any>;
  listRecord: Contact[] = [];
  loading: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private contactService: ContactService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.http.get(this.contactService.getURL())
      .subscribe((response: any) => {
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
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const contact: Contact = {
      name: data.name,
      company: data.company,
      mail: data.mail,
      phone: data.phone,
      description: data.description,
      viewed: true
    }
    this.http.put(this.contactService.getURL() + '/' + data.id, JSON.stringify(contact), {headers: headers})
      .subscribe((response: any) => {
        console.log(response);
        this.loadTable();
      });
  }

  deleteData(index: number) {
    this.http.delete(this.contactService.getURL() + '/' + index)
      .subscribe((response: any) => {
        console.log(response);
        this.loadTable();
      });
    this._snackBar.open('Dato eliminado exitosamente', '',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
