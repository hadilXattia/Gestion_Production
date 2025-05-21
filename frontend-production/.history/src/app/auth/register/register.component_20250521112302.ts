import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { username: '', password: '', role: 'TECHNICIEN' };

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => alert('Compte créé !'),
      error: () => alert('Échec de l’inscription'),
    });
  }
}
