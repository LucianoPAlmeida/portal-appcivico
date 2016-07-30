import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {AuthenticateService} from '../services/authenticate.service';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    selector: 'navigation-bar',
    templateUrl : 'app/components/navigation.component.html',
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    providers: [AuthenticateService, CookieService, HTTP_PROVIDERS]
})

export class NavigationComponent { 


    constructor(private authservice: AuthenticateService, private router: Router){}

    ngOnInit() {
        if(!this.authservice.hasAuthenticatedUser()){
            this.router.navigate(['/']);
        }
    }

    logOutClick(){
        this.authservice.logOut();
        this.router.navigate(['']);
    }

}