import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    selector: 'navigation-bar',
    templateUrl : 'app/components/navigation/navigation.component.html',
    directives: [ROUTER_DIRECTIVES ],
    providers: [UserService, CookieService, HTTP_PROVIDERS]
})

export class NavigationComponent { 


    constructor(private userService: UserService, private router: Router){}

    ngOnInit() {
        if(!this.userService.hasAuthenticatedUser()){
            this.router.navigate(['/login']);
        }
    }

    logOutClick(){
        this.userService.logOut();
        this.router.navigate(['/login']);
    }

}