import {Component} from '@angular/core';
import { NgForm }    from '@angular/common';
import {UserService} from '../../services/user.service';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {PostTypeService} from '../../services/posttype.service';
import {TypePost} from '../../model/typepost.model';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';
import {UserSession} from '../../model/usersession.model';
import {Application} from '../../model/application.model';

@Component({
    selector: 'posttype-form',
    templateUrl : 'app/components/posttypeform/posttypeform.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingIndicator],
    providers: [PostTypeService, UserService, CookieService, HTTP_PROVIDERS] 
})

export /**
 * ApplicationForm
 */
class PostTypeForm extends LoadingPage{
    
    errorMessage: string = null;
    sucessMessage: string = null;
    currentPostType: TypePost = new TypePost();

    public apps: Application []; 

    public selectedApp: Application;

    isUpdating: boolean = false;

    constructor(private postService: PostTypeService, private userService: UserService) {
        super(false);
    }

    clear() {
       this.currentPostType.description = "";
    }

    newTypePost(){
        this.isUpdating = false; 
        this.currentPostType
    }

    onSubmit(){
        if (this.isUpdating){
            this.updatePostType();
        }else{
            this.registerPostType();
        }
    }

    registerPostType(){
       //this.standby();
    }

    updatePostType() {
        
    }
}