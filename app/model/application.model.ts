export /**
 * Application
 */
class Application {
    cod: number;
    description: string;
    name: string;

    constructor() {
        
    }

    public clone(): Application {
        var newApp = new Application();
        newApp.cod = this.cod;
        newApp.name = this.name;
        newApp.description = this.description;
        console.log(newApp);
        return newApp;
    }
}