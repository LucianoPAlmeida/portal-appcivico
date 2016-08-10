import {Component, Input, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {TypePost} from '../../model/typepost.model';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NavigationComponent} from '../navigation/navigation.component';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {PostTypeService} from '../../services/posttype.service';
import {CookieService} from 'angular2-cookie/core';
import {Application} from '../../model/application.model';
import {ApplicationService} from '../../services/application.service';
import {Modal} from '../modal/modal.component';
import {PostTypeForm} from  '../posttypeform/posttypeform.component';

@Component({
    selector: 'list-posttypes',
    templateUrl : 'app/components/listposttypes/listposttypes.component.html',
    providers: [UserService, PostTypeService, HTTP_PROVIDERS, CookieService, ApplicationService],
    directives: [ROUTER_DIRECTIVES, NavigationComponent, LoadingIndicator, Modal, PostTypeForm]
})

export /**
 * ListPostTypes
 */
class ListPostTypes extends LoadingPage{

    @ViewChild(Modal)
    private modal : Modal;

    @ViewChild(PostTypeForm)
    private posttypeForm: PostTypeForm;

    public apps: Application[];

    isLoaded: boolean = false;

    public currentApp: Application = null;

    public appPostTypes: TypePost [];

    private typePostToDelete: TypePost = null;

    isLoadingTypes: boolean = false;
    isTypesLoaded: boolean = false;

    errorMessage: string = null;

    constructor(private postService: PostTypeService,private userService: UserService,private appservice: ApplicationService, private router: Router) {
        super(false);
    }

    ngOnInit() {
        if(!this.userService.hasAuthenticatedUser()){
            this.router.navigate(['/']);
        }else{
            this.standby();
            this.appservice.getApps(this.userService.currentSession().currentDeveloper.cod).subscribe(apps => {
                this.ready();
                this.isLoaded = true;
                this.apps = apps as Application[];
                this.apps = this.apps.sort((a:Application,b: Application)=> {
                    return a.cod - b.cod
                });
                this.posttypeForm.apps = this.apps;
            }, error => {
                this.ready();
                this.showErrorMessage("Houve um erro ao carregar os aplicativos. Verifique sua conexão com a internet e recarregue a página.");
            });
        }
    }

    changeAppAction(app: Application){
        // var app = this.apps[index];
        this.startLoadTypes();
        this.postService.postTypesForApp(app.cod).subscribe((types: TypePost[])=> {
            this.stopLoadTypes();
            this.appPostTypes = types;
            this.isTypesLoaded = true;
        }, error => {
            this.stopLoadTypes();
            this.showErrorMessage("Falha ao carregar tipos de postagem para o aplicativo. Verifique sua conexão com a internet e recarregue a página.");
        });
    }

    startLoadTypes(){
        this.isLoadingTypes = true;
        this.standby();

    }

    stopLoadTypes(){
        this.isLoadingTypes = false;
        this.ready();
    }
    //@ViewChild(Alert) alert;
    onSubmit(){
        // this.modal.title('titulo').text('texto').okButtonTitle('ok').showCancelButton(false).open();
    }

    newPostTypeAction(){
        this.posttypeForm.newTypePost()
    }

    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    selectTypePost(posttype: TypePost){
        this.posttypeForm.setUpdatePostForm(posttype.clone(), this.appPostTypes, this.apps);        
    }


    // modalClickOkAction(object: any) {
    //     if (object['tag'] == 1){
    //         this.modal.title('Excluindo').text('Excluíndo tipo de postagem...').showCancelButton(false).showOkButton(false);
    //         this.modal.standby();
    //         this.postService.deletePostType(this.userService.currentSession().token, this.typePostToDelete.cod).subscribe(()=>{
    //             this.modal.ready();
    //             this.modal.tag(0).title('Sucesso').text('Tipo de postagem excluído com sucesso.').okButtonTitle('Ok').showOkButton(true).showCancelButton(false);
    //             setTimeout(() =>{
    //                 this.modal.close();
    //             }, 2);
    //         }, error => {
    //             this.modal.ready();
    //             if(error.status == 400){
    //                 this.modal.tag(0).title('Não excluído')
    //                     .text('Um tipo de postagem só pode ser excluído se não houver nenhuma postagem deste tipo. Também não pode existir algum outro tipo de postagem relacionado a ele.')
    //                     .okButtonTitle('Ok').showOkButton(true).showCancelButton(false);
    //             }else if (error.status == 401){
    //                 this.userService.logOut();
    //                 this.router.navigate(['/']);
    //             }else{
    //                 this.modal.tag(0).title('Erro').text('Houve uma falha na comunicação com o server, e não foi possível realizar a operação.').okButtonTitle('Ok').showOkButton(true).showCancelButton(false);
    //             }
    //         });
    //     }else {
    //         this.modal.close();
    //     }
    // }


    // clickDeleteButton(typePost: TypePost){
    //     this.typePostToDelete = typePost;
    //     this.modal.tag(1).title('Confimar').text('Deseja excluir o tipo de postagem \"'+typePost.cod+ '-' + typePost.description + '\"?')
    //                     .cancelButtonTitle('Cancelar').okButtonTitle('Sim').showCancelButton(true).open();
    // }

    registerNewPostType(typePost: TypePost){
        if(this.currentApp && this.currentApp.cod == typePost.codApp){
            this.appPostTypes.push(typePost);
        }
    }

    updatePostType(typePost: TypePost){
        if(this.currentApp && this.currentApp.cod == typePost.codApp){
            for(let i = 0 ; i < this.appPostTypes.length; i+=1){
                if(typePost.cod == this.appPostTypes[i].cod){
                    this.appPostTypes[i] = typePost;
                }
            }
        }
    }
}

