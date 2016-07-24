import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../services/user.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {Developer} from '../model/developer.model';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl : 'app/components/register.component.html',
    providers: [UserService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})

export /**
 * RegisterComponent
 */
class RegisterComponent {

    developer: Developer = new Developer();
    password: string;

    constructor(private service: UserService) {}

    get diagnostic() { return JSON.stringify(this.developer); }

}