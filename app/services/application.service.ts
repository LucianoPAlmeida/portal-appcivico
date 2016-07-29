
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Application} from '../model/application.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export /**
 * ApplicationService
 */
class ApplicationService {

    getAppsURL: string = ""

    constructor(private http: Http) {}

    getApps(codOwner: number): Observable<Application[]>{
       return this.http.get(this.getAppsURL).map((response: Response) => {
            let body = response.json();
            return body.data || { };
       });
    }
}