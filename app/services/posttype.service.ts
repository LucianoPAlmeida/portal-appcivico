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
            let types : TypePost[] = [];
            for (let json of body){
                types.push(this.jsonToPost(json));
            }
            return types;
        });
    }

    private jsonToPost(json: any): TypePost {
        var typePost = new TypePost();
        typePost.cod = json['cod'];
        typePost.description = json['descricao'];
        typePost.codRelatedPostType = this.codParentTypeFromJson(json);
        typePost.codApp = this.codAppFromJson(json);
        return typePost;
    }

    private codParentTypeFromJson(json: any): number{
        return this.refCodeFromJson(json, 'tipoPostagemPai');
    }

    private codAppFromJson(json: any): number{
        return this.refCodeFromJson(json,'aplicativo');
    }

    private refCodeFromJson(json: any, rel: string): number{
        var links = json['links'];
        for (var link of links){
            if(link['rel'] == rel){
                var ref = link['href'] as string;
                var array = ref.split('/');
                return +array[array.length-1];
            }
        }
        return null;
    }

    private postTypesForApplicationURL(appCode: number) : string {
        return this.postTypesURL + "/aplicativo/" + appCode;
    }
}