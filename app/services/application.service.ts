
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Application} from '../model/application.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export /**
 * ApplicationService
 */
class ApplicationService {

    getAppsURL: string = "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/aplicativos";

    constructor(private http: Http) {}

    getApps(codOwner: number): Observable<Application[]>{
       return this.http.get(this.getAppsURL).map((response: Response) => {
            let body = response.json();
            var apps : Application[] = [];
            for (let jsonApp of body) {
                var app = new Application();
                app.cod = jsonApp['cod'];
                app.name = jsonApp['nome'];
                app.description = jsonApp['descricao'];
                apps.push(app);
            }
            return apps;
       });
    }

    registerApp(codOwner: number, app: Application){

    }
}