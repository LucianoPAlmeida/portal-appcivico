import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ProfileTypeService} from '../../services/profiletype.service';
import {TypeProfile} from '../../model/typeprofile.model';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {UserSession} from '../../model/usersession.model';
import {Application} from '../../model/application.model';

@Component({
    selector: 'profiletype-form',
    templateUrl : 'app/components/profiletypeform/profiletypeform.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingIndicator],
    providers: [ProfileTypeService, UserService, CookieService, HTTP_PROVIDERS] 
})

export /**
 * ApplicationForm
 */
class ProfileTypeForm extends LoadingPage{
    
    errorMessage: string = null;
    sucessMessage: string = null;
    currentProfileType: TypeProfile = new TypeProfile();

    public apps: Application []; 

    public selectedApp: Application;

    isUpdating: boolean = false;

    constructor(private profileService: ProfileTypeService, private userService: UserService) {
        super(false);
    }

    clear() {
       this.currentProfileType.desscription = "";
    }

    newApp(){
        this.isUpdating = false; 
        this.currentProfileType = new TypeProfile();
    }

    onSubmit(){
        if (this.isUpdating){
            this.updateProfileType();
        }else{
            this.registerProfileType();
        }
    }

    registerProfileType(){
       //this.standby();
    }

    updateProfileType() {
        
    }

    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    showSuccessMessage(message: string){
        this.sucessMessage = message;
    }
    // selectApp(index: number) {
    //     this.selectedApp = this.apps[index];
    //     console.log(this.selectedApp.clone());
    // }
}