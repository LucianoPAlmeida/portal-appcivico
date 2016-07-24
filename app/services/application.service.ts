
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Application} from '../model/application.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export /**
 * ApplicationService
 */
class ApplicationService {

    constructor(private http: Http) {}
}