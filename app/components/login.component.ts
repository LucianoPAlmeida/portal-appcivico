import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {AuthenticateService} from '../services/authenticate.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl : 'app/components/login.component.html',
    providers: [AuthenticateService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent { 


    email: string;
    password: string;

    showLoginFailMsg: boolean = false;


    constructor(private service: AuthenticateService){}

    onSubmit() { 
        this.service.authenticate(this.email, this.password).subscribe(data => {
            console.log(data);
        });
    }

}
