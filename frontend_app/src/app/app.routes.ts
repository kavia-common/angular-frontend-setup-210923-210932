import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', title: 'Home • Angular App' },
  { path: 'about', component: AboutComponent, title: 'About • Angular App' },
  { path: '**', component: NotFoundComponent, title: 'Not found • Angular App' },
];
