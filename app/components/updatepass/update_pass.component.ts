import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {UserService} from '../../services/user.service';
import {Developer} from '../../model/developer.model';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {NavigationComponent} from '../navigation/navigation.component';

@Component({
    selector: 'update-password',
    templateUrl : 'app/components/updatepass/update_pass.component.html',
    providers: [UserService, HTTP_PROVIDERS, CookieService],
    directives: [ROUTER_DIRECTIVES,NavigationComponent, LoadingIndicator]
})

export /**
 * UpdatePassComponent
 */
class UpdatePassComponent extends LoadingPage{

    password: string;
    new_password: string;

    errorMessage: string;

    constructor(private userService: UserService,private router: Router) {
        super(false);
    }


    onSubmit(){
        
    }

}