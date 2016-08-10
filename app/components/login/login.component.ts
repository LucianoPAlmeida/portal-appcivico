import {Component, ViewChild} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';

@Component({
    selector: 'app-login',
    templateUrl : 'app/components/login/login.component.html',
    providers: [UserService, CookieService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, LoadingIndicator]
})

export class LoginComponent extends LoadingPage{ 


    email: string;
    password: string;

    errorMessage: string = null;


    constructor(private service: UserService, private router: Router){
        super(false)
    }

    onSubmit() { 
        this.errorMessage = null;
        this.standby();
        this.service.authenticate(this.email, this.password).subscribe(data => {
            this.ready();
            console.log(this.service.currentSession().currentDeveloper);
            this.router.navigate(['/main']);
        }, error => {
            this.ready();
            if(error.status == 401){
                this.errorMessage = 'Falha ao autenticar, e-mail ou senha estão incorretos';
            }else{
                 this.errorMessage = 'Erro de conexão, falta de conexão com a internet ou servidor não está respondendo';
            }
        });
    }

    

}
