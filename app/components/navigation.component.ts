import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {AuthenticateService} from '../services/authenticate.service';

@Component({
    selector: 'navigation-bar',
    templateUrl : 'app/components/navigation.component.html',
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES]
})

export class NavigationComponent { 


    constructor(private authservice: AuthenticateService, private router: Router){}

    ngOnInit() {
 
    }

    logOutClick(){
        this.authservice.logOut();
        this.router.navigate(['']);
    }

}