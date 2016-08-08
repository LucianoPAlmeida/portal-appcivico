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
    postTypesForApp(codApp: number): Observable<TypePost[]> {
        return this.http.get(this.postTypesForApplicationURL(codApp)).map((response: Response)=> {
            let body = response.json();
            return body.map((json : any)=> {
                return this.jsonToPost(json);
            });
        });
    }

    private jsonToPost(json: any): TypePost {
        var typePost = new TypePost();
        typePost.cod = json['cod'];
        typePost.description = json['descricao'];
        
        return typePost;
    }

    private postTypesForApplicationURL(appCode: number) : string {
        return this.postTypesURL + "/" + appCode;
    }
}