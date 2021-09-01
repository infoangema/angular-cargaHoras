import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Contact } from "../interfaces/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URLCONTACT: string = 'https://hours-backend-pruebas.herokuapp.com/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(this.URLCONTACT);
  }

  deleteContact(index: number): Observable<any> {
    return this.http.delete(this.URLCONTACT + '/' + index);
  }

  updateViewed(contact: Contact): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.URLCONTACT + '/' + contact.id, JSON.stringify(contact), {headers: headers});
  }
}
