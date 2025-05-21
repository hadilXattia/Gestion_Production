import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <app-navbar></app-navbar>
    <div style="padding: 20px">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
