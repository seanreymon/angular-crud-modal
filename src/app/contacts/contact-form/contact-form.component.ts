import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../shared/contact.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../shared/contact.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact = {} as Contact;
  contactForm: FormGroup = new FormGroup({});
  isEditMode = false;
  constructor(
    private contactService: ContactService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    console.log(this.contact);
  }
  onSubmit() {
    let contactData: Contact = this.contactForm.value;
    if (Object.keys(this.contact).length > 0) {
      this.contactService
        .updateContact(this.contact.id, contactData)
        .subscribe();
    } else {
      this.contactService.addContact(contactData).subscribe();
    }
    this.isEditMode = false;
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close(true);
  }

  initForm() {
    let contactName = '';
    let contactEmail = '';
    let contactNumber = '';

    if (Object.keys(this.contact).length > 0) {
      this.isEditMode = true;
      contactName = this.contact.name;
      contactEmail = this.contact.email;
      contactNumber = this.contact.contactNumber;
    }

    this.contactForm = new FormGroup({
      name: new FormControl(contactName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(contactEmail, [
        Validators.required,
        Validators.email,
      ]),
      contactNumber: new FormControl(contactNumber, [
        Validators.required,
        Validators.pattern('[0-9]{11}'),
      ]),
    });
  }
}
