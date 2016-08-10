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



    registerProfileTypesForApp(token: string, appCod: number, profileType: TypeProfile){
        var headers = new Headers({'appToken' : token});
        this.http.post(this.profileTypesForApp(appCod), {},{headers : headers})
    }

    getProfileTypesForApp(appCod: number): Observable<TypeProfile []>{
        return this.http.get(this.profileTypesForApp(appCod)).map((response: Response)=> {
            var body = response.json();
            var profiles : TypeProfile [] = [];
            for(let json of body){
                profiles.push(this.jsonToProfileType(json));
            }
            return profiles;
        });
    }


    private profileTypesForApp(appCod: number) : string {
        return "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/aplicativos/" + appCod + "/tipos-perfil";
    }

    private jsonToProfileType(json: any): TypeProfile {
        var profileType = new TypeProfile();
        profileType.cod = json['codTipoPerfil'] as number;
        profileType.description = json['descricao'];
        return profileType;
    }
}