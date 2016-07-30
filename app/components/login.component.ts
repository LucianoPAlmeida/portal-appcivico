import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {AuthenticateService} from '../services/authenticate.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    selector: 'app-login',
    templateUrl : 'app/components/login.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthenticateService, CookieService, HTTP_PROVIDERS]
})

export class LoginComponent { 


    email: string;
    password: string;

    errorMessage: string = null;


    constructor(private service: AuthenticateService, private router: Router){}

    onSubmit() { 
        this.errorMessage = null;
        this.service.authenticate(this.email, this.password).subscribe(data => {
                this.router.navigate(['/main']);
        }, error => {
            if(error.status == 401){
                this.errorMessage = 'Falha ao autenticar, e-mail ou senha estão incorretos';
            }else{
                 this.errorMessage = 'Erro de conexão, falta de conexão com a internet ou servidor não está respondendo';
            }
        });
    }

    

}
