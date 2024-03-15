import { Component, Input } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactService } from '../shared/contact.service';
import { mergeMap } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  @Input() contacts: Contact[] = [];
  @Input() isTableView = true;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private contactService: ContactService
  ) {}

  openContact(contact: Contact) {
    const modalRef = this.modalService.open(ContactDetailsComponent);
    modalRef.componentInstance.contact = contact;
  }

  openEdit(contact: Contact) {
    const modalRef = this.modalService.open(ContactFormComponent);
    modalRef.componentInstance.contact = contact;

    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('result from edit');
          this.contactService.getContacts().subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
          });
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }

  openDelete(contactId: number) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.title =
      'Are you sure you want to delete this contact?';
    modalRef.componentInstance.message =
      'This will delete this contact permanently. You cannot undo this action.';

    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('result from delete');
          this.contactService
            .deleteContact(contactId)
            .pipe(mergeMap(() => this.contactService.getContacts()))
            .subscribe((contacts: Contact[]) => {
              this.contacts = contacts;
            });
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
