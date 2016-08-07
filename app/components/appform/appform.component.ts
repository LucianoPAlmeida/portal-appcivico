import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../model/application.model';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {UserSession} from '../../model/usersession.model';

@Component({
    selector: 'app-form',
    templateUrl : 'app/components/appform/appform.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingIndicator],
    providers: [ApplicationService, UserService, CookieService, HTTP_PROVIDERS] 
})

export /**
 * ApplicationForm
 */
class ApplicationForm extends LoadingPage{
    
    errorMessage: string = null;
    sucessMessage: string = null;
    currentApplication: Application = new Application();

    isUpdating: boolean = false;

    constructor(private appService: ApplicationService, private userService: UserService) {
        super(false);
    }

    clear() {
       this.currentApplication.name = "";
       this.currentApplication.description = "";
    }

    newApp(){
        this.isUpdating = false; 
        this.currentApplication = new Application();
    }

    onSubmit(){
        console.log('submit');
        if (this.isUpdating){
            this.updateApplication();
        }else{
            this.registerApplication();
        }
    }

    registerApplication(){
        var codOwner = this.userService.currentSession().currentDeveloper.cod;
        var token = this.userService.currentSession().token;
        this.standby();
        this.appService.registerApp(token, codOwner, this.currentApplication).subscribe((appCode: any)=>{
            this.ready();
        }, error => {
            this.ready();

        });
    }

    updateApplication() {
        var codOwner = this.userService.currentSession().currentDeveloper.cod;
        var token = this.userService.currentSession().token;
        this.standby();
        this.appService.updateApp(token,codOwner,this.currentApplication).subscribe((response => {
            this.ready();

        }),error => {
            this.ready();

        });
    }
}