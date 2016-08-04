import {Component, Input, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ApplicationService} from '../services/application.service';
import {UserService} from '../services/user.service';
import {Application} from '../model/application.model';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';
import {NavigationComponent} from './navigation.component';
import {ApplicationForm} from './appform.component';
import {LoadingIndicator, LoadingPage} from './loading.component';


@Component({
    selector: 'list-apps',
    templateUrl : 'app/components/listapp.component.html',
    providers: [UserService, ApplicationService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES, NavigationComponent, ApplicationForm, LoadingIndicator]
})

export /**
 * ListAppsComponent
 */
class ListAppsComponent extends LoadingPage{

    @ViewChild(NavigationComponent)
    private navComponent: NavigationComponent;

    @ViewChild(ApplicationForm)
    private appForm: ApplicationForm;

    apps: Application[] = [];

    isLoaded: boolean = false;

    constructor(private userService: UserService, private appservice: ApplicationService, private router: Router) {
        super(false);
    }


    ngOnInit() {
        if(!this.userService.hasAuthenticatedUser()){
            this.router.navigate(['/']);
        }else{
            this.standby();
            this.appservice.getApps(this.userService.currentSession().currentDeveloper.cod).subscribe(apps => {
                this.ready();
                this.apps = apps as Application[];
                this.apps = this.apps.sort((a:Application,b: Application)=> {
                    return a.cod - b.cod
                });
            }, error => {
                this.ready();
                //TODO: Handle error.
            });
        }
    }

    selectApp(index: number){
        this.appForm.currentApplication = this.apps[index].clone();
        this.appForm.isUpdating = true;
    }

    newAppClickAction(){
        this.appForm.newApp();
    }

}