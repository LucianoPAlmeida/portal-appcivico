import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {UserService} from '../services/user.service';
import {Developer} from '../model/developer.model';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-register',
    templateUrl : 'app/components/register.component.html',
    providers: [UserService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES]
})

export /**
 * RegisterComponent
 */
class RegisterComponent {

    developer: Developer = new Developer();

    errorMessage: string = null;

    constructor(private userService: UserService) {}

    get diagnostic() { return JSON.stringify(this.developer); }

    onSubmit() {
        //this.service.registerDeveloper()
    }
}