import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactsChanged = new Subject<Contact[]>();

  url = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>(this.url);
  }

  getContact(id: number) {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  addContact(contact: Contact) {
    return this.http.post<Contact>(this.url, contact);
  }

  updateContact(id: number, updatedContact: Contact) {
    return this.http.put<Contact>(`${this.url}/${id}`, updatedContact);
  }

  deleteContact(id: number) {
    return this.http.delete<Contact>(`${this.url}/${id}`);
  }
}
