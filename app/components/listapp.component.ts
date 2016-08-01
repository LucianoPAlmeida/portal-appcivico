import {Component, Input, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ApplicationService} from '../services/application.service';
import {UserService} from '../services/user.service';
import {Application} from '../model/application.model';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';
import {NavigationComponent} from './navigation.component';

@Component({
    selector: 'list-apps',
    templateUrl : 'app/components/listapp.component.html',
    providers: [UserService, ApplicationService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES, NavigationComponent]
})

export /**
 * ListAppsComponent
 */
class ListAppsComponent {

    @ViewChild(NavigationComponent)
    private navComponent: NavigationComponent;

    apps: Application[];

    isLoaded: boolean = false;

    constructor(private userService: UserService, private appservice: ApplicationService) {}

    getApps(){
        //this.appservice.getApps()
    }

}