
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Application} from '../model/application.model';
import {Observable} from 'rxjs/Observable';
import {URLProvider} from './urlprovider.service';

@Injectable()
export /**
 * ApplicationService
 */
class ApplicationService {

    // appsURL: string = "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/aplicativos";

    urlProvider: URLProvider = new URLProvider();

    constructor(private http: Http) {}

    getApps(codOwner: number): Observable<Application[]>{
       return this.http.get(this.getAppOwnerURL(codOwner)).map((response: Response) => {
            let body = response.json();
            var apps : Application[] = [];
            for (let jsonApp of body) {
                var app = new Application();
                app.cod = Number(jsonApp['cod']);
                app.name = jsonApp['nome'];
                app.description = jsonApp['descricao'];
                apps.push(app);
            }
            return apps;
       });
    }

    registerApp(appToken: string,codOwner: number, app: Application): Observable<number>{
        var headers = new Headers({'appToken' : appToken});
        return this.http.post(this.urlProvider.appsURL() ,{codResponsavel: codOwner, nome: app.name, descricao: app.description},{headers: headers}).map((response: Response) => {
            var location = response.headers.get('Location');
            var parts = location.split('/');
            return (parts.length > 0) ? +parts[parts.length - 1] : null;
        });
    }

    updateApp(appToken: string,codOwner: number, app: Application): Observable<any>{
        var url = this.urlProvider.appCodURL(app.cod);
        var headers = new Headers({'appToken' : appToken});
        return this.http.put(url,{codResponsavel: codOwner, nome: app.name, descricao: app.description}, {headers : headers});
    }

    private getAppOwnerURL(codOwner: number): string {
        return this.urlProvider.appsOwnerURL(codOwner);
    }
}