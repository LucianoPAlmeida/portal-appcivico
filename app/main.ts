import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {appRouterProviders} from './routes/app.routes';
import {enableProdMode} from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy} from '@angular/common';



enableProdMode();

bootstrap(AppComponent,[appRouterProviders, {provide: LocationStrategy, useClass: HashLocationStrategy}]);
