export /**
 * URLProvider
 */
class URLProvider {

    private serverDomain = "http://mobile-aceite.tcu.gov.br";
  //  private serverDomain = "localhost:8080";
    constructor() {
    }

    public appsURL() : string{
        return this.serverDomain + "/appCivicoRS/rest/aplicativos";
    }

    public appCodURL(codApp: number) : string {
        return this.appsURL() + '/' + codApp;
    }

    public appsOwnerURL(codOwner: number) : string {
        return this.appsURL() + '/pessoa/'+ codOwner;
    }

    public postTypeURL(): string{
        return this.serverDomain + '/appCivicoRS/rest/tipos-postagem';
    }

    public postTypeCodURL(cod: number): string{
        return this.postTypeURL() + '/' + cod;
    }

    public postTypesForApplicationURL(codApp: number): string{
        return this.postTypeURL() + '/aplicativo/' +  codApp;
    }

    public profileTypesForAppURL(appCod: number) : string {
        return this.appCodURL(appCod) + "/tipos-perfil";
    }

    public profileTypesURL(appCod: number, typeCod: number) : string {
        return this.profileTypesForAppURL(appCod)+ "/" + typeCod;
    }

    public personURL(): string {
        return this.serverDomain + '/appCivicoRS/rest/pessoas';
    }

    public personAuthURL(): string {
        return this.personURL() + '/autenticar';
    }

    public personProfileURL(codPerson: number): string {
        return this.personURL() + '/' + codPerson + '/perfil';
    }
    

}