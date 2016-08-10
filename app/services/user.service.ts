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
    //loginUrl = "http://localhost:8888/appcivico-server/loginform.php";
    loginUrl = "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/pessoas/autenticar";
    userProfileURL = "";

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

    authenticate(email: string, password: string): Observable<void> {
        // var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'accept' : 'application/json'});
        // var body = 'email='+ email + '&password=' + password;
        // return this.http.post(this.loginUrl,body, {headers: headers}).map(response => {
            // var token : string = response.headers.get('appToken');
        //     var developer : Developer = response.json();
            // this.setLoggedUserSession(new UserSession(token,developer));
            // return true;
        // });

        var headers = new Headers({'email' : email, 'senha' : password});
        return this.http.get(this.loginUrl,{headers: headers}).map((response: Response)=>{
            var token : string = response.headers.get('appToken');
            var developer : Developer = this.jsonToDeveloper(response.json());
            this.setLoggedUserSession(new UserSession(token,developer));
            return;
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

    updateUserOnSession(developer: Developer){
        var session = this.currentSession();
        session.currentDeveloper = developer;
        this.setLoggedUserSession(session);
    }

    hasAuthenticatedUser(): boolean {
        return this.currentSession() != null;
    }


    private jsonToDeveloper(json: any ): Developer{
      var developer : Developer = new Developer();
      developer.name = json['nomeUsuario'];
      developer.email = json['email'];
      developer.cod = json['cod'];
      return developer;
    }
}