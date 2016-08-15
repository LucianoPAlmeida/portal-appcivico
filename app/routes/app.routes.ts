import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ListAppsComponent} from '../components/listapp/listapp.component';
import {AppComponent} from '../app.component';
import {ListProfiles} from '../components/listprofiles/listprofiles.component';
import {ListPostTypes} from '../components/listposttypes/listposttypes.component';
import {PrincipalComponent} from '../components/principal/principal.component';
import {ListHashtags} from '../components/listhashtags/listhashtags.component'
const routes: RouterConfig = [
  { path: '', component: PrincipalComponent},
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent},
  { path: 'principal', component: PrincipalComponent},
  { path: 'aplicativos', component: ListAppsComponent},
  { path: 'tipos-de-perfil', component: ListProfiles},
  { path: 'tipos-de-postagem', component: ListPostTypes},
  { path: 'hashtags', component: ListHashtags}
];

export const appRouterProviders = [
  provideRouter(routes)
];
