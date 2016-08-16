
import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {NavigationComponent} from '../navigation/navigation.component';


@Component({
    selector: 'principal-component',
    templateUrl : 'app/components/principal/principal.component.html',
    directives: [ROUTER_DIRECTIVES,NavigationComponent ],
    providers: [UserService, CookieService, HTTP_PROVIDERS]
})

export /**
 * PrincipalComponent
 */
class PrincipalComponent {
   
    constructor(private userService: UserService, private router: Router){}

    ngOnInit() {
        // console.log(this.userService.currentSession());
        if(!this.userService.hasAuthenticatedUser()){
            this.router.navigate(['/login']);
        }
    }


}