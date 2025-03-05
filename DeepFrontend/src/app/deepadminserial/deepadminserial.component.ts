import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deepadminserial',
  templateUrl: './deepadminserial.component.html',
  styleUrls: ['./deepadminserial.component.css']
})
export class DeepadminserialComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Logique de déconnexion ici (par exemple, suppression du token)
    console.log('Déconnexion effectuée');

    // Rediriger vers deeppublic
    this.router.navigate(['/deeppublic']);
  }

  reloadPage(): void {
    alert('Pour afficher les images, redémarrer la page');
    window.location.reload();  // Recharger la page
  }
}
