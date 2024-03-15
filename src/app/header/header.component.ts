import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from '../contacts/contact-form/contact-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isTableView = true;
  contacts: Contact[] = [];

  closeResult = '';

  constructor(
    private contactService: ContactService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('header initiated');
    this.fetchContacts();
  }

  fetchContacts() {
    this.contactService.getContacts().subscribe((contactsData: Contact[]) => {
      this.contacts = contactsData;
    });
  }

  onClickGrid() {
    this.isTableView = !this.isTableView;
  }

  openAdd() {
    const modalRef = this.modalService.open(ContactFormComponent);
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('result from add');
          this.fetchContacts();
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
