import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {PostTypeService} from '../../services/posttype.service';
import {TypePost} from '../../model/typepost.model';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {UserSession} from '../../model/usersession.model';
import {Application} from '../../model/application.model';

@Component({
    selector: 'posttype-form',
    templateUrl : 'app/components/posttypeform/posttypeform.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingIndicator],
    providers: [PostTypeService, UserService, CookieService, HTTP_PROVIDERS] 
})

export /**
 * ApplicationForm
 */
class PostTypeForm extends LoadingPage{
    
    errorMessage: string = null;
    sucessMessage: string = null;
    currentPostType: TypePost = new TypePost();

    public apps: Application []; 
    public selectedApp: Application;

    public postTypes: TypePost [];
    public selectedParentPostType: TypePost = null;


    isUpdating: boolean = false;

    isLoadingParents: boolean = false;

    constructor(private postService: PostTypeService, private userService: UserService) {
        super(false);
    }

    clear() {
       this.currentPostType.description = "";
       this.selectedParentPostType = null;
    }

    newTypePost(){
        this.isUpdating = false; 
        this.currentPostType = new TypePost();
    }

    onSubmit(){
        if (this.isUpdating){
            this.updatePostType();
        }else{
            this.registerPostType();
        }
    }

    changeAppAction(app: Application) {
        this.hideErrorMessage();
        this.postService.postTypesForApp(app.cod).subscribe((types: TypePost[])=> {
            this.postTypes = types;
        }, error => {
            this.showErrorMessage('Falha ao carregar tipos de postagem para o aplicativo. Verifique sua conexão com a internet e recarregue a página.');
        });
    }

    registerPostType(){
       //this.standby();
    }

    updatePostType() {
        
    }

    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    hideErrorMessage(){
        this.errorMessage = null;
    }
    showSuccessMessage(message: string){
        this.sucessMessage = message;
    }

    clearParentSelect(){
        this.selectedParentPostType = null;
    }

    setUpdatePostForm(postType: TypePost, typesForApp: TypePost[], apps: Application[]){
        this.postTypes = typesForApp;
        this.apps = apps;
        this.isUpdating = true;
        this.currentPostType = postType;
        this.selectedApp = this.appForCode(postType.codApp);
        this.selectedParentPostType = this.parentTypeForCode(postType.codRelatedPostType);
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

    private parentTypeForCode(cod: number){
        if (cod != null ) {
            for(let type of this.postTypes){
                if(type.cod == cod){
                    return type;
                }
            }
        }
        return null;
    }
}