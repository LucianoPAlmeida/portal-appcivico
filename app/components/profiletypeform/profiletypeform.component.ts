import {Component, Output, EventEmitter} from '@angular/core';
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

    @Output()
    public register = new EventEmitter();

    @Output()
    public update= new EventEmitter();

    constructor(private profileService: ProfileTypeService, private userService: UserService, private router: Router) {
        super(false);
    }

    clear() {
       this.currentProfileType.description = "";
    }

    newProfileType(){
        this.isUpdating = false; 
        this.currentProfileType = new TypeProfile();
        this.selectedApp = null;
    }

    onSubmit(){
        if (this.isUpdating){
            this.updateProfileType();
        }else{
            this.registerProfileType();
        }
    }

   public registerProfileType(){
       this.hideMessages();
       this.standby();
       this.profileService.registerProfileTypesForApp(this.userService.currentSession().token, this.selectedApp.cod, this.currentProfileType).subscribe((cod: number)=> {
           this.ready();
           this.clear();
           this.currentProfileType.cod = cod;
           this.showSuccessMessage('Tipo de perfil cadastrado com sucesso. O código desse tipo de perfil é \"'+ cod +'\". Esse será o código que será usado na criação de perfis de seus usuários.');
           this.register.emit(this.currentProfileType.clone());
       }, error => {
           this.ready();
           if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/']);
            }else{
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar o cadastro. Verifique sua conexão com a internet e tente novamente.');
            }
       });
    }

    public updateProfileType() {
        this.hideMessages();
        this.standby();
        this.profileService.updateProfileTypeForApp(this.userService.currentSession().token, this.currentProfileType).subscribe(()=> {
            this.ready();
            this.clear();
            this.showSuccessMessage('Tipo de perfil alterado com sucesso.');
            this.update.emit(this.currentProfileType.clone());
        }, error => {
           this.ready();
           if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/']);
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

    setUpdatingProfileType(profileType: TypeProfile){
        this.currentProfileType = profileType;
        this.isUpdating = true;
        this.selectedApp = this.appForCode(profileType.codApp);
    }

    private appForCode(cod: number){
        if (cod != null ) {
            for(let app of this.apps){
                if(app.cod == cod){
                    return app;
                }
            }
        }
        return null;
    }

}