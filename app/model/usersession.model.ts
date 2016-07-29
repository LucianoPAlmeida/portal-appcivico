import {Developer} from './developer.model';
export /**
 * UserSession
 */
class UserSession {
    token: string;
    currentDeveloper: Developer; 
    
    constructor(token: string, developer: Developer) {
        this.token = token;
        this.currentDeveloper = developer;
    }

}