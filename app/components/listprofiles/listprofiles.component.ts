import {Component, Input, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {TypeProfile} from '../../model/typeprofile.model';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NavigationComponent} from '../navigation/navigation.component';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {ProfileTypeService} from '../../services/profiletype.service';
import {CookieService} from 'angular2-cookie/core';
import {Application} from '../../model/application.model';
import {ApplicationService} from '../../services/application.service';
import {ProfileTypeForm} from '../profiletypeform/profiletypeform.component'
import {Modal} from '../modal/modal.component';


@Component({
    selector: 'list-profiles',
    templateUrl : 'app/components/listprofiles/listprofiles.component.html',
    providers: [UserService, ProfileTypeService, HTTP_PROVIDERS, CookieService, ApplicationService],
    directives: [ROUTER_DIRECTIVES, NavigationComponent, LoadingIndicator, ProfileTypeForm, Modal]
})
export /**
 * ListProfiles
 */
class ListProfiles extends LoadingPage{

    @ViewChild(NavigationComponent)
    private navComponent: NavigationComponent;

    @ViewChild(ProfileTypeForm)
    private profileTypeForm: ProfileTypeForm;

    apps: Application[] = [];

    profileTypes: TypeProfile[] = []

    isLoaded: boolean = false;
    isProfilesLoaded: boolean = false;

    public currentApp: Application = null;

    errorMessage: string = null;

    constructor(private profileService: ProfileTypeService, private userService: UserService,private appservice: ApplicationService, private router: Router) {
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
                this.profileTypeForm.apps = this.apps;
            }, error => {
                this.ready();
                this.showErrorMessage("Houve um erro ao carregar os aplicativos. Verifique sua conexão com a internet e recarregue a página.");
            });
        }
    }

    newProfileTypeAction(){

    }


    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    changeAppAction(app: Application){
        console.log(app);
        this.standby();
        this.profileService.getProfileTypesForApp(app.cod).subscribe((profileTypes: TypeProfile[])=>{
            this.ready();
            
        }, error => {
            this.ready();
            this.showErrorMessage('');
        });
    }

} 