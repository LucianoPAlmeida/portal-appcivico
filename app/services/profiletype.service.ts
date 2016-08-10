import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {TypeProfile} from '../model/typeprofile.model';
import {Observable} from 'rxjs/Observable';
import {URLProvider} from './urlProvider.service';


@Injectable()

export /**
 * PostTypeService
 */
class ProfileTypeService {
    constructor(private http: Http) {}

    urlProvider: URLProvider = new URLProvider();


    public registerProfileTypesForApp(token: string, appCod: number, profileType: TypeProfile): Observable<number>{
        var headers = new Headers({'appToken' : token});
        return this.http.post(this.urlProvider.profileTypesForAppURL(appCod), {descricao: profileType.description},{headers : headers}).map((response: Response)=> {
            var location = response.headers.get('location');
            var array = location.split('/');
            return +array[array.length-1];
        });
    }


    public updateProfileTypeForApp(token: string, profileType: TypeProfile): Observable<void>{
        var headers = new Headers({'appToken' : token});
        return this.http.put(this.urlProvider.profileTypesURL(profileType.codApp, profileType.cod), {descricao: profileType.description}).map((response: Response)=>{
            return;
        });
    }

    deleteProfileTypeForApp(token: string, appCod: number, profileType: TypeProfile): Observable<void>{
        var headers = new Headers({'appToken' : token});
        return this.http.delete(this.urlProvider.profileTypesURL(appCod, profileType.cod)).map((response: Response)=>{
            return;
        });
    }

    getProfileTypesForApp(appCod: number): Observable<TypeProfile []>{
        return this.http.get(this.urlProvider.profileTypesForAppURL(appCod)).map((response: Response)=> {
            var body = response.json();
            var profiles : TypeProfile [] = [];
            for(let json of body){
                profiles.push(this.jsonToProfileType(json));
            }
            return profiles;
        });
    }


    // private profileTypesForAppURL(appCod: number) : string {
    //     return "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/aplicativos/" + appCod + "/tipos-perfil";
    // }

    // private profileTypesURL(appCod: number, typeCod: number) : string {
    //     return "http://mobile-aceite.tcu.gov.br/appCivicoRS/rest/aplicativos/" + appCod + "/tipos-perfil/" + typeCod;
    // }


    private jsonToProfileType(json: any): TypeProfile {
        var profileType = new TypeProfile();
        profileType.cod = json['codTipoPerfil'] as number;
        profileType.description = json['descricao'];
        profileType.codApp = this.locationCodeFromJson(json, 'aplicativo');
        return profileType;
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

}