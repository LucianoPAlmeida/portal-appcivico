import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ApplicationService} from '../services/application.service';
import {Application} from '../model/application.model';
@Component({
    selector: 'app-form',
    templateUrl : 'app/components/appform.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ApplicationService, UserService, CookieService, HTTP_PROVIDERS] 
})

export /**
 * ApplicationForm
 */
class ApplicationForm {
    
    errorMessage: string = null;
    sucessMessage: string = null;
    currentApplication: Application = new Application();

    isUpdating: boolean = false;

    constructor() {}

    clear() {
       this.currentApplication.name = "";
       this.currentApplication.description = "";
    }

    newApp(){
        this.currentApplication = new Application();
    }
}