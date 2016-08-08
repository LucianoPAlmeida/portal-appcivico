import {Component, ViewChild, ElementRef} from '@angular/core';


@Component({
    selector: 'modal-view',
    templateUrl: 'app/components/modal/modal.component.html'
})
export /**
 * Modal
 */
class Modal {

    titleAttr: string;
    textAttr: string;
    okButtonTitleAttr: string;
    cancelButtonTitlAttr: string;
    showCancelButtonAttr: boolean = false;
    
    constructor() {}
    

    open() {
        (<any>$('#myModal')).modal('show');
    }

    close(){
        (<any>$('#myModal')).modal('hide');
    }

    text(text: string): Modal{
        this.textAttr = text;
        return this;
    }

    title(title: string): Modal{
        this.titleAttr = title;
        return this;
    }

    okButtonTitle(title: string): Modal{
        this.okButtonTitleAttr = title;
        return this;
    }

    cancelButtonTitle(cancelTitle: string): Modal {
        this.cancelButtonTitlAttr = cancelTitle;
        return this;
    }

    showCancelButton(show: boolean): Modal {
        this.showCancelButtonAttr = show;
        return this;
    }

}