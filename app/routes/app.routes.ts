import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/login.component';
import {RegisterComponent} from '../components/register.component';
import {NavigationComponent} from '../components/navigation.component';
import {ListAppsComponent} from '../components/listapp.component';
import {AppComponent} from '../app.component';


const routes: RouterConfig = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'main', component: NavigationComponent},
  { path: 'apps', component: ListAppsComponent}
];

export const appRouterProviders = [
  provideRouter(routes)
];