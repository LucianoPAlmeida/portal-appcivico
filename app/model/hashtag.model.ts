export /**
 * Hashtag
 */
class Hashtag {

    cod: number;
    name: string;
    description: string;
    codApp: number;

    constructor() {
        
    }

    clone(): Hashtag {
        var newHashtag = new Hashtag();
        newHashtag.cod = this.cod;
        newHashtag.description = this.description;
        newHashtag.codApp = this.codApp;
        newHashtag.name = this.name;
        return newHashtag;
    }
}