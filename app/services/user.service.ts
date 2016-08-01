import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Developer} from '../model/developer.model';
import {Observable} from 'rxjs/Observable';
import {UserSession} from '../model/usersession.model';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export /**
 * UserService
 */
class UserService {

    registerDeveloperURL = "http://localhost:8888/appcivico-server/register.php";
    loginUrl = "http://localhost:8888/appcivico-server/loginform.php";

    constructor(private http: Http, private cookieService: CookieService){}


    registerDeveloper(developer: Developer): Observable<boolean>{
      var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'accept' : 'application/json'});
      var body = 'email='+ developer.email + '&password=' + developer.password +'&name=' + developer.name + '&about=' + developer.about;
      return this.http.post(this.registerDeveloperURL,body, {headers : headers}).map(response => {
         var token : string = response.headers.get('appToken');
         var developer : Developer = response.json();

         this.setLoggedUserSession(new UserSession(token,developer));
         return true;
      });
      //  this.http.post(this.pessoasURL,)
    }

    updateDeveloper(developer: Developer){
       
    }

    authenticate(email: string, password: string): Observable<boolean> {
        var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'accept' : 'application/json'});
        var body = 'email='+ email + '&password=' + password;
        return this.http.post(this.loginUrl,body, {headers: headers}).map(response => {
            var token : string = response.headers.get('appToken');
            var developer : Developer = response.json();
            this.setLoggedUserSession(new UserSession(token,developer));
            return true;
        });
    }

    setLoggedUserSession(currentSession: UserSession){
        this.cookieService.putObject('user_session', currentSession);
    }

    logOut() {
        this.cookieService.remove('user_session');
    }

    currentSession(): UserSession{
        return this.cookieService.getObject('user_session') as UserSession;
    }

    hasAuthenticatedUser(): boolean {
        return this.currentSession() != null;
    }
}