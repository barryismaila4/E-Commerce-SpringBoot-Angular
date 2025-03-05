import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeepadminserialComponent } from './deepadminserial/deepadminserial.component';
import { DeepcategoryComponent } from './deepadminserial/deepcategory/deepcategory.component';
import { DeepproduitComponent } from './deepadminserial/deepproduit/deepproduit.component';
import { DeepuserComponent } from './deepadminserial/deepuser/deepuser.component';
import { DeepcommandeComponent } from './deepadminserial/deepcommande/deepcommande.component';
import { DeeppublicComponent } from './deeppublic/deeppublic.component';
import { ChatbotComponent } from './deeppublic/chatbot/chatbot.component';  // Importation du composant Chatbot
import { ContactComponent } from './deeppublic/contact/contact.component'; // Importation du composant Contact
import { ListmessageComponent } from './deepadminserial/listmessage/listmessage.component';
import { CodeComponent } from './deeppublic/code/code.component';
import { RecuComponent } from './deepadminserial/recu/recu.component';  // Importation du composant Recu
import { FactureComponent } from './deepadminserial/facture/facture.component';
import { LoginComponent } from './deeppublic/login/login.component';
import { RegistrationComponent } from './deeppublic/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/deeppublic', pathMatch: 'full' }, // deeppublic par défaut
  { 
    path: 'deepadminserial', 
    component: DeepadminserialComponent,
    children: [
      { path: 'deepcategories', component: DeepcategoryComponent },
      { path: 'deepproduits', component: DeepproduitComponent },
      { path: 'deeputilisateurs', component: DeepuserComponent },
      { path: 'deepcommandes', component: DeepcommandeComponent },
      { path: 'listmessage', component: ListmessageComponent },
      { path: 'recu', component: RecuComponent } ,
      { path: 'facture', component: FactureComponent } // Route pour le composant Recu,
    ]
  },
  { path: 'deeppublic', component: DeeppublicComponent },
  { path: 'chatbot', component: ChatbotComponent },  // Route pour le Chatbot
  { path: 'contact', component: ContactComponent }, // Route pour le Contact
  { path: 'coding', component: CodeComponent }, 
  { path: 'deeppublic/login', component:  LoginComponent }, 
  { path: 'deeppublic/register', component:  RegistrationComponent }, 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }