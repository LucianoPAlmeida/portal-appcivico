export /**
 * TypeProfile
 */
class TypeProfile {
    cod: number;
    description: string;
    codApp: number;

    constructor() {}

    clone(): TypeProfile {
        var newType = new TypeProfile();
        newType.cod = this.cod;
        newType.description = this.description;
        newType.codApp = this.codApp;
        return newType;
    }
}