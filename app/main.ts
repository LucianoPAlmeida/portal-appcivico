import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LoginComponent} from './components/login.component';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register.component';
import {appRouterProviders} from './routes/app.routes';
import {enableProdMode} from '@angular/core';
import {AuthenticateService} from './services/authenticate.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';


enableProdMode();

bootstrap(AppComponent,[appRouterProviders,AuthenticateService, HTTP_PROVIDERS,CookieService]);
