import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {TypePost} from '../model/typepost.model';
import {Observable} from 'rxjs/Observable';
import {URLProvider} from './urlProvider.service';

@Injectable()

export /**
 * PostTypeService
 */
class PostTypeService {
    constructor(private http: Http) {}

    urlProvider: URLProvider = new URLProvider();


   // postTypesURL : string = "http://mobile-aceite.tcu.gov.br:/";

    postTypesForApp(codApp: number): Observable<TypePost[]> {
        return this.http.get(this.urlProvider.postTypesForApplicationURL(codApp)).map((response: Response)=> {
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
        typePost.contentDescription = json['textoFormatoJson'];
        typePost.codRelatedPostType = this.codParentTypeFromJson(json);
        typePost.codApp = this.codAppFromJson(json);
        return typePost;
    }


    public registerNewPostType(token: string, typePost: TypePost): Observable<number> {
        var body = this.bodyFromTypePost(typePost);
        return this.http.post(this.urlProvider.postTypeURL(), body).map((response: Response)=> {
            var location = response.headers.get('location');
            var array = location.split('/');
            return +array[array.length-1];
        });
    }

    public updatePostType(token: string, typePost: TypePost): Observable<void>{
        var body = this.bodyFromTypePost(typePost);
        return this.http.put(this.urlProvider.postTypeCodURL(typePost.cod), body).map((response: Response)=> {
            return;
        });
    }

    public deletePostType(token: string, typePostCod: number): Observable<any>{
        return this.http.delete(this.urlProvider.postTypeCodURL(typePostCod)).map((response: Response)=> {
            return;
        });
    }


    // MARK: Convenience methods
    private bodyFromTypePost(typePost: TypePost): any {
        var body : any = {codAplicativo : typePost.codApp, descricao: typePost.description};
        if(typePost.codRelatedPostType){
            body['codTipoPostagemPai'] = typePost.codRelatedPostType;
        }
        if(typePost.contentDescription){
            body['textoFormatoJson'] = typePost.contentDescription;
        }
        return body;
    }

    private codParentTypeFromJson(json: any): number{
        return this.locationCodeFromJson(json, 'tipoPostagemPai');
    }

    private codAppFromJson(json: any): number{
        return this.locationCodeFromJson(json,'aplicativo');
    }

    private locationCodeFromJson(json: any, rel: string): number{
        var links = json['links'];
        for (var link of links){
            if(link['rel'] == rel){
                var location = link['href'] as string;
                var array = location.split('/');
                return +array[array.length-1];
            }
        }
        return null;
    }

    // private postTypesForApplicationURL(appCode: number) : string {
    //     return this.postTypesURL + "/aplicativo/" + appCode;
    // }

    // private postTypeCodURL(postTypeCod: number) : string {
    //     return this.postTypesURL + '/' + postTypeCod;
    // }
}