import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CommonModule,
    FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  // Données du formulaire avec tableau de rôles (multiple)
  signupData = {
    username: '',
    password: '',
    roles: [] as string[]
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.signupData.roles.length === 0) {
      alert('Veuillez sélectionner au moins un rôle.');
      return;
    }

    this.authService.signup(this.signupData).subscribe({
  next: (response) => {
    console.log('Inscription réussie:', response); // response est une chaîne de caractères
    alert(response);  // Affiche par exemple "Utilisateur enregistré avec succès!"
  },
  error: (error) => {
    console.error('Erreur inscription détaillée:', error);
    alert('Erreur lors de l’inscription : ' + (error.error?.message || error.statusText || error.message));
  }
});

  }
}
