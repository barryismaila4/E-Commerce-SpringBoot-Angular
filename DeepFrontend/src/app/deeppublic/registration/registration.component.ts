import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeepUserService } from 'src/app/services/deep-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private deepUserService: DeepUserService, private router: Router) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.deepUserService.register(this.userForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie:', response);
          this.router.navigate(['/deeppublic/login']); // rediriger vers la page de connexion après inscription
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription:', error);
        }
      });
    }
  }

  onReturn(): void {
    window.location.href = 'http://localhost:4200/deeppublic/'; // redirection vers l'URL spécifiée
  }
}