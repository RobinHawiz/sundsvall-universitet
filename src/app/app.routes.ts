import { Routes } from '@angular/router';
import { KurserComponent } from './pages/kurser/kurser.component';
import { MittRamschemaComponent } from './pages/mitt-ramschema/mitt-ramschema.component';
import { HemComponent } from './pages/hem/hem.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'hem',
    pathMatch: 'full',
  },
  { path: 'kurser', component: KurserComponent },
  { path: 'mitt-ramschema', component: MittRamschemaComponent },
  { path: 'hem', component: HemComponent },
];
