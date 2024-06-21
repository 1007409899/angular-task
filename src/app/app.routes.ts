import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Listado de tareas',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        title: 'Agregar tarea',
        path: '',
        loadComponent: () => import('./dashboard/components/add-task/add-task.component').then(m => m.AddTaskComponent),
      }
    ]
  },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  }
];
