import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],  // clé 'username'
      password: ['', Validators.required]
    });
  }

ngOnInit() {
  this.auth.getLoggedInObservable().subscribe(isLogged => {
    console.log('Is logged in?', isLogged);
  });

  this.auth.getRolesObservable().subscribe(roles => {
    console.log('User roles:', roles);
  });
}
  onSubmit() {
  if (this.form.invalid) {
    this.message = "Veuillez remplir tous les champs.";
    return;
  }
  this.auth.login(this.form.value).subscribe({
    next: (res) => {
      if (res.token) {
        this.auth.setToken(res.token);  // utilisation de la méthode du service
        this.message = "Connexion réussie !";

        setTimeout(() => {
          this.router.navigate(['/products']);  // redirection après connexion
        }, 1000);
      } else {
        this.message = "Aucun token reçu du serveur.";
      }
    },
    error: () => {
      this.message = "Échec de la connexion, vérifiez vos identifiants.";
    }
  });
  
}
/*
  logout() {
  this.auth.logout();
  this.message = "Déconnecté avec succès.";
  this.form.reset();
}*/

}
