import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {UserService} from '../../services/user.service';
import {Developer} from '../../model/developer.model';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';

@Component({
    selector: 'app-register',
    templateUrl : 'app/components/register/register.component.html',
    providers: [UserService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES, LoadingIndicator]
})

export /**
 * RegisterComponent
 */
class RegisterComponent extends LoadingPage{

    aceptedTerms: boolean = false;

    developer: Developer = new Developer();

    errorMessage: string = null;

    constructor(private userService: UserService,private router: Router) {
        super(false);
    }

    get diagnostic() { return JSON.stringify(this.developer); }

    onSubmit() {
        this.standby();
        this.userService.registerDeveloper(this.developer).subscribe(cod => {
            this.userService.authenticate(this.developer.email, this.developer.password).subscribe(()=>{
                this.ready();
                this.router.navigate(['/principal']);
            }, error =>{
                this.ready();
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar o cadastro. Verifique sua conexão com a internet e tente novamente.');               
            });
        }, error => {
            this.ready();
            if(error.status == 400){
                this.errorMessage = "O e-mail informado já encontra-se cadastrado, verifique se você já utiliza esse e-mail em algum aplicativo que utiliza a plataforma APP Cívico.";
            }else{ 
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar o cadastro. Verifique sua conexão com a internet e tente novamente.');
            }
        });
    }

    showErrorMessage(message: string){
        (<any>$('body')).animate({ scrollTop: 0 }, 'fast');
        this.errorMessage = message;
    }
}