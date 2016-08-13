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


    getHashtagsForApp(): Observable<Hashtag[]>{
        return null;
    }

    registerNewHashtag(token: string,hashtag: Hashtag): Observable<number>{
        var headers = new Headers({'appToken' : token});

        return null;
    }

    updateHashtag(token: string,hashtag: Hashtag): Observable<void> {
        var headers = new Headers({'appToken' : token});
        
        return null;
    }
}