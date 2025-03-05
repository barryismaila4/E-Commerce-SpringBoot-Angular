import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeepadminserialComponent } from './deepadminserial/deepadminserial.component';
import { DeepcategoryComponent } from './deepadminserial/deepcategory/deepcategory.component';
import { DeepproduitComponent } from './deepadminserial/deepproduit/deepproduit.component';
import { DeepuserComponent } from './deepadminserial/deepuser/deepuser.component';
import { DeepcommandeComponent } from './deepadminserial/deepcommande/deepcommande.component';
import { DeeppublicComponent } from './deeppublic/deeppublic.component';
import { ChatbotComponent } from './deeppublic/chatbot/chatbot.component';
import { ContactComponent } from './deeppublic/contact/contact.component';
import { ListmessageComponent } from './deepadminserial/listmessage/listmessage.component';
import { CodeComponent } from './deeppublic/code/code.component';
import { RecuComponent } from './deepadminserial/recu/recu.component';
import { FactureComponent } from './deepadminserial/facture/facture.component';
import { RegistrationComponent } from './deeppublic/registration/registration.component';
import { LoginComponent } from './deeppublic/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DeepadminserialComponent,
    DeepcategoryComponent,
    DeepproduitComponent,
    DeepuserComponent,
    DeepcommandeComponent,
    DeeppublicComponent,
    ChatbotComponent,
    ContactComponent,
    ListmessageComponent,
    CodeComponent,
    RecuComponent,
    FactureComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
