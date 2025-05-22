import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
 /* form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });*/
  form: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  }
 
  onSubmit() {
    if (this.form.invalid) return;

    this.auth.signup(this.form.value).subscribe({
      next: () => {
        this.message = 'Compte créé avec succès. Redirection...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.message = 'Erreur lors de la création du compte.';
      },
    });
  }
}
