import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit.component';
import { MachineComponent } from './components/machine/machine.component';
import { TechnicienComponent } from './components/technicien/technicien.component';
import { OrdreFabricationComponent } from './components/ordre-fabrication/ordre-fabrication.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

export const routes: Routes = [
  { path: 'produits', component: ProduitComponent },
  { path: 'machines', component: MachineComponent },
  { path: 'techniciens', component: TechnicienComponent },
  { path: 'ordres', component: OrdreFabricationComponent },
  { path: 'maintenances', component: MaintenanceComponent },
  { path: '', redirectTo: 'produits', pathMatch: 'full' },
  { path: '**', redirectTo: 'produits' }
];
