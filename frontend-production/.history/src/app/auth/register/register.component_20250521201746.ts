import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

// Modules Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// FormsModule pour [(ngModel)]
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { username: '', password: '', role: 'TECHNICIEN' };

isAdmin = false;

constructor(private authService: AuthService) {
  this.isAdmin = this.authService.isAdmin();
}
  register() {
    this.authService.register(this.user).subscribe({
      next: () => alert('Compte créé !'),
      error: () => alert('Échec de l’inscription'),
    });
  }
}
