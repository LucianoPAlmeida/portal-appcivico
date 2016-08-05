import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {TypePost} from '../model/typepost.model';
import {Observable} from 'rxjs/Observable';

@Injectable()

export /**
 * PostTypeService
 */
class PostTypeService {
    constructor(private http: Http) {}

    postTypesURL : string = "http://mobile-aceite.tcu.gov.br:/appCivicoRS/rest/tipos-postagem";
    postTypesForOwner(codOwner: number): Observable<TypePost[]> {
        return this.http.get(this.postTypesURL).map((response: Response)=> {
            let body = response.json();
            var types : TypePost[] = [];
            for (let jsonApp of body) {
                var typePost = new TypePost();
                typePost.cod = jsonApp['cod'];
               
                types.push(typePost);
            }
            return apps;
        });
    }
}