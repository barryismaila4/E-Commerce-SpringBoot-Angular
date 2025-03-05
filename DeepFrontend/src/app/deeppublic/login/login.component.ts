import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeepUserService } from 'src/app/services/deep-user.service';
import { Router } from '@angular/router';  // Importez Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deepUserService: DeepUserService,
    private router: Router  // Ajoutez Router dans le constructeur
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailContainsAtSymbol()]],  // Validation personnalisée ajoutée ici
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Validation personnalisée pour l'email
  emailContainsAtSymbol() {
    return (control: any) => {
      const email = control.value;
      if (email && !email.includes('@')) {
        return { invalidEmail: 'L\'email doit contenir le symbole @' };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.deepUserService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Connexion réussie:', response);
          // La redirection est déjà gérée par le service
        },
        error: (error) => {
          console.error('Erreur lors de la connexion:', error);
          if (error.status === 401) {
            alert('Email ou mot de passe incorrect');
          } else {
            alert('Erreur lors de la connexion');
          }
        }
      });
    } else {
      const emailControl = this.loginForm.get('email');
      if (emailControl?.hasError('invalidEmail')) {
        alert(emailControl?.getError('invalidEmail'));  // Affiche l'alerte si l'email est invalide
      }
    }
  }

  // Méthode pour rediriger vers la page d'inscription
  redirectToRegister(): void {
    this.router.navigate(['/deeppublic/register']);  // Redirection vers la page d'inscription
  }

  // Méthode pour rediriger vers la page deeppublic
  goBack(): void {
    this.router.navigate(['/deeppublic']);  // Redirection vers deeppublic
  }
}
