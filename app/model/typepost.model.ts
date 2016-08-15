export /**
 * TypePost
 */
class TypePost {
    cod: number;
    description: string;
    codApp: number;
    codRelatedPostType: number;
    contentDescription: string;
    codDestinationObjType: number;
    
    constructor() {
        
    }

    public clone(): TypePost {
        var newTypePost = new TypePost();
        newTypePost.cod = this.cod;
        newTypePost.description = this.description;
        newTypePost.codRelatedPostType = this.codRelatedPostType;
        newTypePost.codApp = this.codApp;
        newTypePost.contentDescription = this.contentDescription;
        return newTypePost;
    }

    
}