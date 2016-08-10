import {Component, EventEmitter, Output} from '@angular/core';
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
import {ObjectTypeService} from '../../services/objecttype.service';
import {ObjectType} from '../../model/objecttype.model';
@Component({
    selector: 'posttype-form',
    templateUrl : 'app/components/posttypeform/posttypeform.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingIndicator],
    providers: [PostTypeService, UserService, CookieService,ObjectTypeService, HTTP_PROVIDERS] 
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

    public objectTypes: ObjectType[];
    public selectedObjType: ObjectType;

    isUpdating: boolean = false;

    isLoadingParents: boolean = false;

    @Output()
    public register = new EventEmitter();

    @Output()
    public update = new EventEmitter();


    constructor(private postService: PostTypeService, private userService: UserService, private router: Router, private objService: ObjectTypeService) {
        super(false);
    }

    ngOnInit() {
        this.objService.objectTypes().subscribe((objectTypes: ObjectType[])=>{
            this.objectTypes = objectTypes;
        }, error =>{
            this.errorMessage = 'Ocorreu um erro  e não foi possivel buscar os tipos de objeto disponíveis. Recarregue a página para tentar novamente';
        });

    }

    clear() {
       this.currentPostType.description = "";
       this.selectedParentPostType = null;
    }

    newTypePost(){
        this.isUpdating = false; 
        this.currentPostType = new TypePost();
        this.selectedApp = null;
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
       this.standby();
       this.postService.registerNewPostType(this.userService.currentSession().token ,this.currentPostType).subscribe((cod: number)=> {
            this.ready();
            this.currentPostType.cod = cod;
            this.showSuccessMessage('Tipo de postagem registrada com sucesso.');
            this.register.emit(this.currentPostType);
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

    updatePostType() {
        this.standby();
        this.postService.updatePostType(this.userService.currentSession().token, this.currentPostType).subscribe(()=> {
            this.ready();
            this.showSuccessMessage('Tipo de postagem alterada com sucesso');
            this.update.emit(this.currentPostType);
        }, error=> {
            this.ready();
            if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/']);
            }else{
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar o cadastro. Verifique sua conexão com a internet e tente novamente.');
            }
        });
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