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
    successMessage: string = null;

    recoveryEmail: string = null;

    loginMode: boolean = true;

    constructor(private service: UserService, private router: Router){
        super(false);
    }

    onSubmit() { 
        this.hideMessages();
        if (this.loginMode ){
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
        }else{
            this.forgetMyPassAction();
        }

    }

    
    forgetMyPassAction(){
        this.standby();
        this.service.forgetPassword(this.recoveryEmail).subscribe(()=>{
            this.ready();
            this.showSuccessMessage('Uma nova senha foi gerada e enviada para o seu email');
            setTimeout(()=>{
                this.hideMessages();
                this.loginMode = true;
            }, 2);
        }, error => {
            this.ready();
            console.log(error);
            if(error.status == 404){
                this.showErrorMessage('O e-mail informado não se encontra cadastrado na base.');
            }else{
                this.errorMessage = 'Erro de conexão, falta de conexão com a internet ou servidor não está respondendo';
            }
        });
    }

    cancelForgetMyPass(){
        this.loginMode = true;
    }

    goToForgetMyPass(){
        this.loginMode = false;
    }

        showErrorMessage(message: string){
        this.errorMessage = message;
    }

    hideErrorMessage(){
        this.errorMessage = null;
    }

    hideSucessMessage(){
        this.successMessage = null;
    }

    hideMessages(){
        this.hideErrorMessage();
        this.hideSucessMessage();
    }

    showSuccessMessage(message: string){
        this.successMessage = message;
    }
}
