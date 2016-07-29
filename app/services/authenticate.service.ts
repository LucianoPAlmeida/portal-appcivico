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

   currentSession: UserSession = null; 

   loginUrl = "http://localhost:8888/appcivico-server/loginform.php";

   constructor(private http: Http){}

   authenticate(email: string, password: string): Observable<boolean> {
        var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'accept' : 'application/json'});
        var body = 'email='+ email + '&password=' + password;
        return this.http.post(this.loginUrl,body, {headers: headers}).map(response => {
            var token : string = response.headers.get('appToken');
            var developer : Developer = response.json();;
            this.currentSession = new UserSession(token,developer);

            return true;
        });
    }


    logOut() {
        this.currentSession = null;
    }

    hasAuthenticatedUser(): boolean {
        return this.currentSession != null;
    }
}