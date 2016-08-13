import {Component, Input, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Hashtag} from '../../model/hashtag.model';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NavigationComponent} from '../navigation/navigation.component';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {HashtagService} from '../../services/hashtag.service';
import {CookieService} from 'angular2-cookie/core';
import {Application} from '../../model/application.model';
import {ApplicationService} from '../../services/application.service';
import {HashTagForm} from '../hashtagfrom/hashtagform.component'
import {Modal} from '../modal/modal.component';


@Component({
    selector: 'list-hashtags',
    templateUrl : 'app/components/listhashtags/listhashtags.component.html',
    providers: [UserService, HashtagService, HTTP_PROVIDERS, CookieService, ApplicationService],
    directives: [ROUTER_DIRECTIVES, NavigationComponent, LoadingIndicator, HashTagForm, Modal]
})
export /**
 * ListHashtags
 */
class ListHashtags extends LoadingPage{

    @ViewChild(NavigationComponent)
    private navComponent: NavigationComponent;

    @ViewChild(HashTagForm)
    private hashtagForm: HashTagForm;

    apps: Application[] = [];

    hashtags: Hashtag[] = []

    isLoaded: boolean = false;
    isHashtagsLoaded: boolean = false;

    public currentApp: Application = null;

    errorMessage: string = null;

    constructor(private hashtagService: HashtagService, private userService: UserService,private appservice: ApplicationService, private router: Router) {
        super(false);
        
    }

     ngOnInit() {
        if(!this.userService.hasAuthenticatedUser()){
            this.router.navigate(['/login']);
        }else{
            this.standby();
            this.appservice.getApps(this.userService.currentSession().currentDeveloper.cod).subscribe(apps => {
                this.ready();
                this.isLoaded = true;
                this.apps = apps as Application[];
                this.apps = this.apps.sort((a:Application,b: Application)=> {
                    return a.cod - b.cod
                });
                this.hashtagForm.apps = this.apps;
            }, error => {
                this.ready();
                this.showErrorMessage("Houve um erro ao carregar os aplicativos. Verifique sua conexão com a internet e recarregue a página.");
            });
        }
    }

    selectHashtag(hashtag: Hashtag){
        this.hashtagForm.setUpdatingHashtag(hashtag.clone());
    }

    newHashtagAction(){
        this.hashtagForm.newHashtag();
    }


    showErrorMessage(message: string){
        this.errorMessage = message;
    }

    changeAppAction(app: Application){
        this.standby();
       //TODO: load hashtags for app
    }


    registerHashtag(hashtag: Hashtag){
        if(this.currentApp && this.currentApp.cod == hashtag.codApp){
            this.hashtags.push(hashtag);
        }
    }

    updateHashtag(hashtag: Hashtag){
        if(this.currentApp && this.currentApp.cod == hashtag.codApp){
            for(let i = 0 ; i < this.hashtags.length; i+=1){
                if(hashtag.cod == this.hashtags[i].cod){
                    this.hashtags[i] = hashtag;
                }
            }
        }
    }
    
} 