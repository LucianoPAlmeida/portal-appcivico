import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {NavigationComponent} from '../components/navigation/navigation.component';
import {ListAppsComponent} from '../components/listapp/listapp.component';
import {AppComponent} from '../app.component';
import {ListProfiles} from '../components/listprofiles/listprofiles.component';
import {ListPostTypes} from '../components/listposttypes/listposttypes.component';
const routes: RouterConfig = [
  { path: '', component: NavigationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent},
  { path: 'principal', component: NavigationComponent},
  { path: 'aplicativos', component: ListAppsComponent},
  { path: 'tipos-de-perfil', component: ListProfiles},
  { path: 'tipos-de-postagem', component: ListPostTypes}
];

export const appRouterProviders = [
  provideRouter(routes)
];