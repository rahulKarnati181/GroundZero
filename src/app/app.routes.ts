import { Routes } from '@angular/router';


import { AboutUsComponent } from './aboutus/aboutus';
import { ContactComponent } from './contact/contact';
import { FooterComponent } from './footer/footer';
import { HomeComponent } from './home/home';
import { ServicesComponent } from './services/services';
import { TutorComponent } from './tutor/tutor';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'tutor', component: TutorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
