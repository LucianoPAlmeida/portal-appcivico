import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Developer} from '../model/developer.model';
import {Observable} from 'rxjs/Observable';
import {UserSession} from '../model/usersession.model';

@Injectable()
export /**
 * AuthenticateService
 */
class AuthenticateService {

   currentSession: UserSession; 

   loginUrl = "http://localhost:8888/appcivico-server/loginform.php";

   constructor(private http: Http){}

   authenticate(email: string, password: string): Observable<any> {
        var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
        var body = 'email='+ email + '&password=' + password;
        return this.http.post(this.loginUrl,body, {headers: headers}).map(response => {
            return (response.status == 200) ? response.json().data : {};
        });
    }


    logOut() {
        this.currentSession = null;
    }

}