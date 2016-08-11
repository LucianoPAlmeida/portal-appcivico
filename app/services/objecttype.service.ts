import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {ObjectType} from '../model/objecttype.model';
import {Observable} from 'rxjs/Observable';
import {URLProvider} from './urlprovider.service';

@Injectable()

export /**
 * ObjectTypeService
 */
class ObjectTypeService {

    urlProvider: URLProvider = new URLProvider();

    constructor(private http: Http) {}

    public objectTypes(): Observable<ObjectType[]>{
        return this.http.get(this.urlProvider.objectTypeURL()).map((response: Response)=> {
            var body = response.json();
            var objTypes: ObjectType[] = [];
            for(let json of body){
                objTypes.push(this.jsonToObjectType(json));
            }
            return objTypes;

        });
    }

    private jsonToObjectType(json: any): ObjectType{
        var objType = new ObjectType();
        objType.cod = json['cod'];
        objType.description = json['descricao'];
        return objType;
    }
}