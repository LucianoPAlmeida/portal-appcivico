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
    alertOpen(){
        // this.modal.title('titulo').text('texto').okButtonTitle('ok').showCancelButton(false).open();
    }

    newPostTypeAction(){
        this.posttypeForm.newTypePost()
    }

    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    selectTypePost(index: number){
        console.log(this.appPostTypes[index]);
        this.posttypeForm.setUpdatePostForm(this.appPostTypes[index], this.appPostTypes, this.apps);        
    }


    modalClickOkAction(value: any) {
        console.log(value);
    }

}

