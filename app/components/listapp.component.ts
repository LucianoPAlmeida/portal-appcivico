import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ApplicationService} from '../services/application.service';
import {UserService} from '../services/user.service';
import {Application} from '../model/application.model';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'list-apps',
    templateUrl : 'app/components/listapp.component.html',
    providers: [UserService, ApplicationService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES]
})

export /**
 * ListAppsComponent
 */
class ListAppsComponent {

    apps: Application[];

    isLoaded: boolean = false;

    constructor(private userService: UserService, private appservice: ApplicationService) {}

    getApps(){
        //this.appservice.getApps()
    }

}