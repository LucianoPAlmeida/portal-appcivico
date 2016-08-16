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
            this.errorMessage = 'Ocorreu um erro e não foi possivel buscar os tipos de objeto disponíveis. Recarregue a página para tentar novamente';
        });

    }

    clear() {
       this.currentPostType.description = "";
       this.selectedParentPostType = null;
       this.selectedObjType = null;
    }

    newTypePost(){

        this.isUpdating = false; 
        this.clear();
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
       this.currentPostType.codApp = this.selectedApp.cod;
       this.currentPostType.codRelatedPostType = (this.selectedParentPostType)? this.selectedParentPostType.cod : null;
       this.currentPostType.codDestinationObjType = (this.selectedObjType) ? this.selectedObjType.cod : null;
       console.log(this.currentPostType);
       this.postService.registerNewPostType(this.userService.currentSession().token,this.currentPostType).subscribe((cod: number)=> {
            this.ready();
            this.currentPostType.cod = cod;
            this.showSuccessMessage('Tipo de postagem registrada com sucesso. O código do tipo de postagem é o \"'+ cod +'\". Esse será o código que você irá usar como parâmetro nos endpoints da plataforma.');
            this.register.emit(this.currentPostType.clone());
            this.newTypePost();
       }, error => {
            this.ready();
            if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/']);
            }else if(error.status == 400){
                this.showErrorMessage('Já existe um tipo de postagem com esse nome cadastrada para esse aplicativo');
            }else{
                this.showErrorMessage('Ocorreu um erro e não foi possível realizar o cadastro. Verifique sua conexão com a internet e tente novamente.');
            }
       });
    }

    updatePostType() {
        this.standby();
        this.currentPostType.codRelatedPostType = (this.selectedParentPostType)? this.selectedParentPostType.cod : null;
        this.currentPostType.codDestinationObjType = (this.selectedObjType) ? this.selectedObjType.cod : null;
        this.postService.updatePostType(this.userService.currentSession().token, this.currentPostType).subscribe(()=> {
            this.ready();
            this.showSuccessMessage('Tipo de postagem alterada com sucesso');
            this.update.emit(this.currentPostType.clone());
            this.newTypePost();
        }, error=> {
            this.ready();
            if(error.status == 401){
                this.userService.logOut();
                this.router.navigate(['/']);
            }else if(error.status == 400){
                this.showErrorMessage('Já existe um tipo de postagem com esse nome cadastrada para esse aplicativo');
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

    clearParentSelect(){
        this.selectedParentPostType = null;
    }

    setUpdatePostForm(postType: TypePost, typesForApp: TypePost[], apps: Application[]){
        this.postTypes = typesForApp;
        this.currentPostType = postType;
        this.apps = apps;
        this.isUpdating = true;
        this.selectedApp = this.appForCode(postType.codApp);
        this.selectedParentPostType = this.parentTypeForCode(postType.codRelatedPostType);
        this.selectedObjType = this.objectTypeForCode(postType.codDestinationObjType);
        
        this.removeCurrentFromPostTypes();


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

    private objectTypeForCode(cod: number){
        if (cod != null ) {
            for(let objtype of this.objectTypes){
                if(objtype.cod == cod){
                    return objtype;
                }
            }
        }
        return null;
    }

    private removeCurrentFromPostTypes(){
        if(this.isUpdating){
            this.postTypes = this.postTypes.filter((postType:TypePost)=>{
                return (postType.cod != this.currentPostType.cod);
            });
        }
    }
}