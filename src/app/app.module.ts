import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NopageComponent } from './nopage/nopage.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    NopageComponent,
    ContactDetailsComponent,
    ContactFormComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
