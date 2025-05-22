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

  onSubmit() {
    if (this.form.invalid) {
      this.message = "Veuillez remplir tous les champs.";
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token); // stockage du token
        this.message = "Connexion réussie !";

        setTimeout(() => {
          this.router.navigate(['/clients']);  // redirection après connexion
        }, 1000);

      },
      error: () => {
        this.message = "Échec de la connexion, vérifiez vos identifiants.";
      }
    });
  }
}
