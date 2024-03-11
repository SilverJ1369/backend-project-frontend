import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full'
  },
  {
    path: 'timeline',
    loadComponent: () => import('./core/timeline/timeline.component').then(m => m.TimelineComponent),
  },
  {
    path: 'main-topic-form',
    loadComponent: () => import('./features/forms/main-topic-form/main-topic-form.component').then(m => m.MainTopicFormComponent),
  }
];
