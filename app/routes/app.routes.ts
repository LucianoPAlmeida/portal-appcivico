import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {NavigationComponent} from '../components/navigation/navigation.component';
import {ListAppsComponent} from '../components/listapp/listapp.component';
import {AppComponent} from '../app.component';
import {ListProfiles} from '../components/listprofiles/listprofiles.component';
import {ListPostTypes} from '../components/listposttypes/listposttypes.component';
const routes: RouterConfig = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'main', component: NavigationComponent},
  { path: 'apps', component: ListAppsComponent},
  { path: 'profiles', component: ListProfiles},
  { path: 'posttypes', component: ListPostTypes}
];

export const appRouterProviders = [
  provideRouter(routes)
];