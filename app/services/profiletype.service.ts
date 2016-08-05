import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {TypeProfile} from '../model/typeprofile.model';
import {Observable} from 'rxjs/Observable';

@Injectable()

export /**
 * PostTypeService
 */
class ProfileTypeService {
    constructor(private http: Http) {}


    private profileTypeURL: string = "";

    profileTypesForApp(token: string, appCod: number, profileType: TypeProfile){
        var headers = new Headers({'appToken' : token});
        this.http.post(this.profileTypeURL, {},{headers : headers})
    }
}