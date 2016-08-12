import {Component, Output, EventEmitter} from '@angular/core';
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

    @Output()
    public register = new EventEmitter();

    @Output()
    public update = new EventEmitter();

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
        if (this.isUpdating){
            this.updateApplication();
        }else{
            this.registerApplication();
        }
    }

    registerApplication(){
        this.hideMessages();
        var codOwner = this.userService.currentSession().currentDeveloper.cod;
        var token = this.userService.currentSession().token;
        this.standby();
        this.appService.registerApp(token, codOwner, this.currentApplication).subscribe((appCode: number)=>{
            this.ready();
            this.currentApplication.cod = appCode;
            this.showSuccessMessage('Aplicativo cadastrado com sucesso com sucesso. O código do aplicativo é o \"'+ appCode +'\".Esse será o código que você irá usar como parâmetro nos endpoints da plataforma.');
            this.register.emit(this.currentApplication);
            this.newApp();
        }, error => {
            this.ready();
            this.showErrorMessage('Ocorreu um erro e não foi possível realizar a alteração. Verifique sua conexão com a internet e tente novamente.');
        });
    }

    updateApplication() {
        this.hideMessages();
        var codOwner = this.userService.currentSession().currentDeveloper.cod;
        var token = this.userService.currentSession().token;
        this.standby();
        this.appService.updateApp(token,codOwner,this.currentApplication).subscribe((result => {
            this.ready();
            this.showSuccessMessage('Aplicativo atualizado com sucesso.');
            this.update.emit(this.currentApplication.clone());
            this.newApp();
        }),error => {
            this.ready();
            if(error.status == 400){
                this.showErrorMessage('Já existe um aplicativo cadastrado com esse nome.');
            }else{
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar a alteração. Verifique sua conexão com a internet e tente novamente.');
            }
        });
    }

    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    hideErrorMessage(){
        this.errorMessage = null;
    }

    hideSucessMessage(){
        this.sucessMessage = null;
    }

    hideMessages(){
        this.hideErrorMessage();
        this.hideSucessMessage();
    }

    showSuccessMessage(message: string){
        this.sucessMessage = message;
    }

}