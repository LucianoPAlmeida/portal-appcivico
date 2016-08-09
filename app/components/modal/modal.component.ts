import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {LoadingIndicator, LoadingPage} from '../loading/loading.component';


@Component({
    selector: 'modal-view',
    templateUrl: 'app/components/modal/modal.component.html',
    directives: [LoadingIndicator]
})
export /**
 * Modal
 */
class Modal extends LoadingPage{

    titleAttr: string;
    textAttr: string;
    okButtonTitleAttr: string;
    cancelButtonTitleAttr: string;
    showCancelButtonAttr: boolean = false;
    tagAttr: number = 0;
    showCloseButtonAttr: boolean = false;
    showOkButtonAttr: boolean = true;

    @Output()
    private clickOk = new EventEmitter();
    
    @Output()
    private clickCancel = new EventEmitter();


    constructor() {
        super(false);
    }
    

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
        this.cancelButtonTitleAttr = cancelTitle;
        return this;
    }

    showCancelButton(show: boolean): Modal {
        this.showCancelButtonAttr = show;
        return this;
    }

    tag(tag: number): Modal {
        this.tagAttr = tag;
        return this;
    }

    showCloseButton(show: boolean ): Modal {
        this.showCloseButtonAttr = show;
        return this;
    }

    showOkButton(show: boolean): Modal{
        this.showOkButtonAttr = show;
        return this;
    }

    // Action
    okButton(){
        this.clickOk.emit({
            value: this.tagAttr
        });
    }

    cancelButton(){
        this.clickCancel.emit({});
    }
}