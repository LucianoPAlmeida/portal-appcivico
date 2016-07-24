import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LoginComponent} from './components/login.component';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register.component';
import {appRouterProviders} from './routes/app.routes';
import {enableProdMode} from '@angular/core';

enableProdMode();

bootstrap(AppComponent,[appRouterProviders]);
