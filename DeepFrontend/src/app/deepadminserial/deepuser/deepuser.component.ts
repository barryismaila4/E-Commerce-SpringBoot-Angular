// src/app/deepuser/deepuser.component.ts
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-deepuser',
  templateUrl: './deepuser.component.html',
  styleUrls: ['./deepuser.component.css']
})
export class DeepuserComponent {

  // Créer les deux utilisateurs
  users: User[] = [
    new User(
      'assets/images/Amadou.jpg', // Chemin de l'image du profil
      'Diallo', 
      'Amadou', 
      null, // Email vide pour Amadou
      '+22369000054', 
      'AmadouDialloDeepBarry'
    ),
    new User(
      'assets/images/Ismaila.jpg', 
      'Barry', 
      'Ismaïla', 
      'ismaila.barry@esprit.tn', 
      '+21628628416', 
      'IsmailaBarryDeepDiallo'
    )
  ];
}
