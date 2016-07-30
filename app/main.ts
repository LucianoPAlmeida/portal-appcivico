import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {appRouterProviders} from './routes/app.routes';
import {enableProdMode} from '@angular/core';



enableProdMode();

bootstrap(AppComponent,[appRouterProviders]);
