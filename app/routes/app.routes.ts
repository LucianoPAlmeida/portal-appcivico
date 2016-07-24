import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/login.component';
import {RegisterComponent} from '../components/register.component';
import {NavigationComponent} from '../Components/navigation.component';
import {AppComponent} from '../app.component';


const routes: RouterConfig = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'main', component: NavigationComponent}
];

export const appRouterProviders = [
  provideRouter(routes)
];