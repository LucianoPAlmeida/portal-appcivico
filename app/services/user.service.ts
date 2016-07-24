import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Developer} from '../model/developer.model';
import {Observable} from 'rxjs/Observable';
@Injectable()
export /**
 * UserService
 */
class UserService {

    pessoasURL = "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/pessoas";
    
    constructor(private http: Http) {}


    registerDeveloper(developer: Developer){

      //  this.http.post(this.pessoasURL,)
    }

    updateDeveloper(developer: Developer){

    }
}