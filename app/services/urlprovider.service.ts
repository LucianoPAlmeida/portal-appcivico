export /**
 * URLProvider
 */
class URLProvider {

    private serverDomain = "http://mobile-aceite.tcu.gov.br";
    //private serverDomain = "http://localhost:8080";
    constructor() {
    }


    //Aplicativos
    public appsURL() : string{
        return this.serverDomain + "/appCivicoRS/rest/aplicativos";
    }

    public appCodURL(codApp: number) : string {
        return this.appsURL() + '/' + codApp;
    }

    public appsOwnerURL(codOwner: number) : string {
        return this.appsURL() + '/pessoa/'+ codOwner;
    }


    //Tipos de Postagem
    public postTypeURL(): string{
        return this.serverDomain + '/appCivicoRS/rest/tipos-postagem';
    }

    public postTypeCodURL(cod: number): string{
        return this.postTypeURL() + '/' + cod;
    }

    public postTypesForApplicationURL(codApp: number): string{
        return this.postTypeURL() + '/aplicativo/' +  codApp;
    }


    //Tipos de perfil
    public profileTypesForAppURL(appCod: number) : string {
        return this.appCodURL(appCod) + "/tipos-perfil";
    }

    public profileTypesURL(appCod: number, typeCod: number) : string {
        return this.profileTypesForAppURL(appCod)+ "/" + typeCod;
    }


    //Pessoas
    public personURL(): string {
        return this.serverDomain + '/appCivicoRS/rest/pessoas';
    }

    public personAuthURL(): string {
        return this.personURL() + '/autenticar';
    }

    public forgetPasswordURL(): string{
        return this.personURL() +'/redefinirSenha';
    }

    public personProfileURL(codPerson: number): string {
        return this.personURL() + '/' + codPerson + '/perfil';
    }


    //Tipos de objeto
    public objectTypeURL(): string{
        return this.serverDomain + '/appCivicoRS/rest/tipos-objeto';
    }


    //Hashtags
    public hashtagsURL(): string {
        return this.serverDomain + '/appCivicoRS/rest/hashtags';
    }

    public hashtagsCodURL(cod: number): string {
        return this.hashtagsURL() + '/' + cod;
    }

    public hashtagsForApp(appCod: number){
        //TODO: implementar a url certa
        return this.hashtagsURL();
    }


}