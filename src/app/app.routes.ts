import { Routes } from '@angular/router';
import { KurserComponent } from './pages/kurser/kurser.component';
import { MittRamschemaComponent } from './pages/mitt-ramschema/mitt-ramschema.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'kurser',
    pathMatch: 'full',
  },
  { path: 'kurser', component: KurserComponent },
  { path: 'mitt-ramschema', component: MittRamschemaComponent },
];
