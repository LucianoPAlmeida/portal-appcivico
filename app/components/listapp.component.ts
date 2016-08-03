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
import {LoadingPage, LoadingIndicator} from './loading.component';


@Component({
    selector: 'list-apps',
    templateUrl : 'app/components/listapp.component.html',
    providers: [UserService, ApplicationService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES, NavigationComponent, ApplicationForm, LoadingIndicator]
})

export /**
 * ListAppsComponent
 */
class ListAppsComponent {

    @ViewChild(NavigationComponent)
    private navComponent: NavigationComponent;

    @ViewChild(ApplicationForm)
    private appForm: ApplicationForm;

    @ViewChild(LoadingIndicator)
    private loadIndicator: ApplicationForm;

    apps: Application[] = [];

    isLoaded: boolean = false;

    constructor(private userService: UserService, private appservice: ApplicationService, private router: Router) {}

    ngOnInit() {
        if(!this.userService.hasAuthenticatedUser()){
            this.router.navigate(['/']);
        }else{
            this.appservice.getApps(this.userService.currentSession().currentDeveloper.cod).subscribe(apps => {
                this.apps = apps as Application[];
            }, error => {
                //TODO: Handle error.
            });
        }
    }

    getApps(){
        
        //this.appservice.getApps()
    }

}