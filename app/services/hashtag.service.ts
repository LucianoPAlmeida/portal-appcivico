import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Hashtag} from '../model/hashtag.model';
import {Observable} from 'rxjs/Observable';
import {URLProvider} from './urlprovider.service';

@Injectable()
export /**
 * HashtagService
 */
class HashtagService {
    constructor(private http: Http) {}

    urlProvider: URLProvider = new URLProvider();


    getHashtagsForApp(codApp: number): Observable<Hashtag[]>{
        return this.http.get(this.urlProvider.hashtagsForApp(codApp)).map((response: Response)=> {
            var body = response.json();
            var hashtags : Hashtag[] = [];
            for(let json of body){
                hashtags.push(this.jsonToHashtag(json));
            }
            return hashtags;
        });
    }

    registerNewHashtag(token: string,hashtag: Hashtag): Observable<number>{
        var headers = new Headers({'appToken' : token});
        return this.http.post(this.urlProvider.hashtagsURL(), {codAplicativo: hashtag.codApp,descricao: hashtag.description,nome: hashtag.name}, {headers: headers}).map((response: Response)=>{
            var location = response.headers.get('Location');
            var array = location.split('/');
            return +array[array.length-1];
        });
    }

    updateHashtag(token: string,hashtag: Hashtag): Observable<void> {
        var headers = new Headers({'appToken' : token});
        return this.http.put(this.urlProvider.hashtagsCodURL(hashtag.cod),{codAplicativo: hashtag.codApp,descricao: hashtag.description,nome: hashtag.name}, {headers: headers}).map((response: Response)=>{
            return;
        });
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

    private jsonToHashtag(json: any): Hashtag {
        var hashtag = new Hashtag();
        hashtag.cod = this.locationCodeFromJson(json, 'self');
        hashtag.description = json['descricao'];
        hashtag.codApp = this.locationCodeFromJson(json, 'aplicativo');
        hashtag.name = json['nome'];
        return hashtag;
    }
}