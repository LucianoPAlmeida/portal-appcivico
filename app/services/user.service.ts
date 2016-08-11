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

   // registerDeveloperURL = "http://localhost:8888/appcivico-server/register.php";


    urlProvider: URLProvider = new URLProvider();


    constructor(private http: Http, private cookieService: CookieService){
        var dev = new Developer();
        dev.cod = 27;
        var token = "v1_EA54A085609BD5293890EF1219ECC9BF254917CE6050D24B8E89C00AC1065927E783D04C1E9B5FBA8B2A664E23AB00A307B5FAA36E3BDAB36989CC930D0C1ED36A885FF59212587FABA1CAF83A4877906E59C22AAB1DAC33D3B8D1F7882407CCDF18B1A6E965F3DC66EF9169F25260B947370AFF615770BCD3853AB0A5A7D2778E96E553107958EA3653EDEF4AAE3D1786DE2F9D0687E421B201D8B7BAF91BDE46F43CD2BFEADB489908E9EE6DF7E1593314D696C81E5ACB8AC7FC136755D8EE5179864BF56F27F68B379B8875A8AA28CD5322666BE8C3983EB961349D7B7E764D6272A2F06382BE98CF7DB23B01056F33DF4391EA91629B16EF6DC24CCC82EEFC7D6A9D5DCD20AF96ACD51B1E2FCFBB";
        this.setLoggedUserSession(new UserSession(token, dev));
    }


    registerDeveloper(developer: Developer): Observable<number>{
      // var headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'accept' : 'application/json'});
      // var body = 'email='+ developer.email + '&password=' + developer.password +'&name=' + developer.name + '&about=' + developer.about;
      // return this.http.post(this.registerDeveloperURL,body, {headers : headers}).map(response => {
      //    var token : string = response.headers.get('appToken');
      //    var developer : Developer = response.json();
      //    this.setLoggedUserSession(new UserSession(token,developer));
      //    return true;
      // });
      var body = {nomeUsuario: developer.name, email : developer.email, senha: developer.password, sexo: developer.genre};
      if (developer.about){
          body['biografia'] = developer.about;
      }
      return this.http.post(this.urlProvider.personURL(), body).map((response: Response)=>{
            var location = response.headers.get("Location");
            var array = location.split("//");
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
            console.log(developer);
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
      developer.about = json['biografia'];
      developer.genre = json['sexo'];
      return developer;
    }
}