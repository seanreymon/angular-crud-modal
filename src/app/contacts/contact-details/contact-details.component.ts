import { Component, Input } from '@angular/core';
import { Contact } from '../../shared/contact.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent {
  @Input() contact: Contact = {} as Contact;

  constructor(public activeModal: NgbActiveModal) {}
}
