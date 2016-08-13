import {Component, Output, EventEmitter} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {HashtagService} from '../../services/hashtag.service';
import {Hashtag} from '../../model/hashtag.model';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {UserSession} from '../../model/usersession.model';
import {Application} from '../../model/application.model';

@Component({
    selector: 'hashtag-form',
    templateUrl : 'app/components/hashtagfrom/hashtagform.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingIndicator],
    providers: [HashtagService, UserService, CookieService, HTTP_PROVIDERS] 
})

export /**
 * ApplicationForm
 */
class HashTagForm extends LoadingPage{
    
    errorMessage: string = null;
    sucessMessage: string = null;

    currentHashtag: Hashtag = new Hashtag();

    public apps: Application []; 

    public selectedApp: Application;

    isUpdating: boolean = false;

    @Output()
    public register = new EventEmitter();

    @Output()
    public update= new EventEmitter();

    constructor(private hashtagService: HashtagService, private userService: UserService, private router: Router) {
        super(false);
    }

    clear() {
       this.currentHashtag.description = "";
       this.currentHashtag.name = "";
    }

    newHashtag(){
        this.isUpdating = false; 
        this.currentHashtag = new Hashtag();
        this.selectedApp = null;
    }

    onSubmit(){
        if (this.isUpdating){
            this.updateHashtag();
        }else{
            this.registerHashtag();
        }
    }

   public registerHashtag(){
       this.hideMessages();
       this.standby();
       this.currentHashtag.codApp = this.selectedApp.cod;
       this.hashtagService.registerNewHashtag(this.userService.currentSession().token, this.currentHashtag).subscribe((cod: number)=>{
           this.ready();
           this.currentHashtag.cod = cod;
           this.showSuccessMessage('Hashtag cadastrada com sucesso');
           this.register.emit(this.currentHashtag.clone());
           this.newHashtag()
       }, error => {
           this.ready();
           if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/login']);
            }else if(error.status == 400){
                this.showErrorMessage('Já existe uma hashtag com esse nome cadastrada para esse aplicativo');
            }else{
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar o cadastro da hashtag. Verifique sua conexão com a internet e tente novamente.');
            }
       });
    }

    public updateHashtag() {
        this.hideMessages();
        this.standby();
        this.currentHashtag.codApp = this.selectedApp.cod;
        this.hashtagService.updateHashtag(this.userService.currentSession().token, this.currentHashtag).subscribe(()=> {
            this.ready();
            this.showSuccessMessage('Hashtag alterada com sucesso.');
            this.update.emit(this.currentHashtag.clone());
            this.newHashtag();            
        }, error => {
            this.ready();
            if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/login']);
            }else if(error.status == 400){
                this.showErrorMessage('Já existe uma hashtag com esse nome cadastrada para esse aplicativo ou o nome está fora do padrão #hashtag');
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

    setUpdatingHashtag(hashtag: Hashtag){
        this.currentHashtag = hashtag;
        this.isUpdating = true;
        this.selectedApp = this.appForCode(hashtag.codApp);
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