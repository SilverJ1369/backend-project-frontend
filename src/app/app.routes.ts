import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./core/home-search/home-search.component').then(m => m.HomeSearchComponent),
  },
  {
    path: 'timeline',
    loadComponent: () => import('./core/timeline/timeline.component').then(m => m.TimelineComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'main-topic-form',
    loadComponent: () => import('./features/forms/main-topic-form/main-topic-form.component').then(m => m.MainTopicFormComponent),
    canActivate: [authGuard],
  },
  {
    path: 'timeline-event-form',
    loadComponent: () => import('./features/forms/timeline-event-form/timeline-event-form.component').then(m => m.TimelineEventFormComponent),
    canActivate: [authGuard],
  },
  {
    path: 'timesuck-episode-form',
    loadComponent: () => import('./features/forms/timesuck-episode-form/timesuck-episode-form.component').then(m => m.TimesuckEpisodeFormComponent),
    canActivate: [authGuard],
  }
];
