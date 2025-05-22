import { Component } from '@angular/core';
import { ClientDTO, ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-create',
  standalone: true,
  templateUrl: './client-create.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ClientCreateComponent {
  form: FormGroup;
  roles: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private authService: AuthService
  ) {
    this.roles = this.authService.getUserRoles();

    this.form = this.fb.group({
      name: ['', Validators.required],
      clientTypeName: ['', Validators.required],
      routeId: [null, [Validators.required, Validators.min(1)]],
    });
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
onSubmit() {
  this.errorMessage = '';
  this.successMessage = '';

  console.log('Token:', this.authService.getToken());
  console.log('Is logged in?', this.authService.isLoggedIn());
  console.log('User roles:', this.roles);

  if (!this.authService.isLoggedIn()) {
    this.errorMessage = "Vous devez être connecté.";
    return;
  }

  if (!this.hasRole('ADMIN')) {
    this.errorMessage = "Vous devez être connecté en tant qu'ADMIN pour créer un client.";
    return;
  }

  if (this.form.invalid) {
    this.errorMessage = "Veuillez remplir tous les champs correctement.";
    return;
  }

  const clientData: ClientDTO = this.form.value;

  this.clientService.createClient(clientData).subscribe({
    next: () => {
      this.successMessage = "Client créé avec succès !";
      this.errorMessage = '';
      this.form.reset();
    },
    error: () => {
      this.errorMessage = "Erreur lors de la création du client.";
      this.successMessage = '';
    }
  });
}

}
