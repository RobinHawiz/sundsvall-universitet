import { Routes } from '@angular/router';
import { KurserComponent } from './pages/kurser/kurser.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'kurser',
    pathMatch: 'full',
  },
  { path: 'kurser', component: KurserComponent },
];
