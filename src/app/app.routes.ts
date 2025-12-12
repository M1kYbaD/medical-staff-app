import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'staff',
    pathMatch: 'full',
  },
  {
    path: 'staff',
    loadComponent: () => import('../features/staff/staff.component').then((m) => m.StaffComponent),
  },
];
