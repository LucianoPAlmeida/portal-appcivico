import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Developer} from '../model/developer.model';
import {Observable} from 'rxjs/Observable';
import {UserSession} from '../model/usersession.model';
import {CookieService} from 'angular2-cookie/core';
import {URLProvider} from  './urlprovider.service';

@Injectable()
export /**
 * UserService
 */
class UserService {

    registerDeveloperURL = "http://localhost:8888/appcivico-server/register.php";


    urlProvider: URLProvider = new URLProvider();


    constructor(private http: Http, private cookieService: CookieService){}


    registerDeveloper(developer: Developer): Observable<number>{
      // var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'accept' : 'application/json'});
      // var body = 'email='+ developer.email + '&password=' + developer.password +'&name=' + developer.name + '&about=' + developer.about;
      // return this.http.post(this.registerDeveloperURL,body, {headers : headers}).map(response => {
      //    var token : string = response.headers.get('appToken');
      //    var developer : Developer = response.json();
      //    this.setLoggedUserSession(new UserSession(token,developer));
      //    return true;
      // });

      return this.http.post(this.urlProvider.personURL(), {nomeUsuario: developer.name, email : developer.email, senha: developer.password}).map((response: Response)=>{
            var location = response.headers.get('location');
            var array = location.split('/');
            return +array[array.length-1];
      });
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
        return this.http.get(this.urlProvider.personAuthURL(),{headers: headers}).map((response: Response)=>{
            var token : string = response.headers.get('appToken');
            var developer : Developer = this.jsonToDeveloper(response.json());
            this.setLoggedUserSession(new UserSession(token,developer));
            return;
        });

    }

    getDeveloperProfile(developerCod: number): Observable<any> {
        var headers = new Headers({appIdentifier: 26});
        return this.http.get(this.urlProvider.personProfileURL(developerCod), {headers : headers}).map((response: Response)=> {
            return response.json();
        });
    }

    registerDeveloperProfile(token: string,codPerson: number, profile: any): Observable<void>{
        var headers = new Headers({appToken: token});
        return this.http.post(this.urlProvider.personProfileURL(codPerson), {camposAdicionais: JSON.stringify(profile), tipoPerfil: {codTipoPerfil: 42}}, {headers: headers}).map((response: Response)=> {
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