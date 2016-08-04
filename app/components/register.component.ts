import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {UserService} from '../services/user.service';
import {Developer} from '../model/developer.model';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {LoadingIndicator, LoadingPage} from './loading.component';

@Component({
    selector: 'app-register',
    templateUrl : 'app/components/register.component.html',
    providers: [UserService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES, LoadingIndicator]
})

export /**
 * RegisterComponent
 */
class RegisterComponent extends LoadingPage{

    developer: Developer = new Developer();

    errorMessage: string = null;

    constructor(private userService: UserService,private router: Router) {
        super(false);
    }

    get diagnostic() { return JSON.stringify(this.developer); }

    onSubmit() {
        this.standby();
        this.userService.registerDeveloper(this.developer).subscribe(sucess => {
            console.log(this.userService.currentSession().currentDeveloper);
            this.ready();
            this.router.navigate(['/main']);
        }, error => {
            this.ready();
            if(error.status == 400){
                this.errorMessage = "O e-mail informado já encontra-se cadastrado, verifique se você já utiliza esse e-mail em algum aplicativo que utiliza a plataforma APP Cívico.";
            }
        });
        //this.service.registerDeveloper()

    }
}