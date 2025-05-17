import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'kurser',
    loadComponent: () =>
      import('./pages/kurser/kurser.component').then((m) => m.KurserComponent),
  },
  {
    path: 'mitt-ramschema',
    loadComponent: () =>
      import('./pages/mitt-ramschema/mitt-ramschema.component').then(
        (m) => m.MittRamschemaComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/hem/hem.component').then((m) => m.HemComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
