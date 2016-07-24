import {Developer} from './developer.model';
export /**
 * UserSession
 */
class UserSession {
    token: string;
    expirationDate: Date;
    currentDeveloper: Developer; 
    
    constructor(token: string, expirationDate: Date, developer: Developer) {
        this.token = token;
        this.expirationDate = expirationDate;
        this.currentDeveloper = developer;
    }

}