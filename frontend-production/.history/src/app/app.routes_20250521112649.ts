import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit.component';
import { MachineComponent } from './components/machine/machine.component';
import { TechnicienComponent } from './components/technicien/technicien.component';
import { OrdreFabricationComponent } from './components/ordre-fabrication/ordre-fabrication.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AdminGuard] },

  { path: 'produits', component: ProduitComponent, canActivate: [AuthGuard] },
  { path: 'machines', component: MachineComponent, canActivate: [AuthGuard] },
  { path: 'techniciens', component: TechnicienComponent, canActivate: [AuthGuard] },
  { path: 'ordres', component: OrdreFabricationComponent, canActivate: [AuthGuard] },
  { path: 'maintenances', component: MaintenanceComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
