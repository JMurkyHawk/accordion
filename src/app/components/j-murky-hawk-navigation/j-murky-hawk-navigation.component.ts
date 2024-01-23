import { Component, ElementRef, Input } from '@angular/core';

export interface LinkData {
    label: string;
    link: string;
}

@Component({
  selector: 'j-murky-hawk-navigation',
  templateUrl: './j-murky-hawk-navigation.component.html',
  styleUrl: './j-murky-hawk-navigation.component.scss'
})
export class JMurkyHawkNavigationComponent {

    public _linkStyle: string = 'button';
    public _linkScrollToId: string = 'mainContent';

    public tagName: string = '';
    public activeLink:string = 'routerLinkActive';
    public activeLinkTitle: string = 'Current page';

    @Input() navItems: Array<LinkData> = [{label: 'Please provide link data list', link: '' }];
    @Input() linkScrollTo: boolean = false;
    @Input() linkScrollDelay: number = 750;

    @Input()
        // Check the provided element ID exists. If so, allow provided value. If not, use default.
        public get linkScrollToId() {
            return this._linkScrollToId;
        }
        public set linkScrollToId(value: string) {
            this._linkScrollToId = this.checkScrollToIdValue(value);
        }

    @Input() 
        // Set the appearance of the navigation links: 'button' (apply .btn style class) or 'text' (styled text link)
        public get linkStyle() {
            return this._linkStyle;
        }

        public set linkStyle(value: string) {
            let validValues: Array<string> = ['button', 'text'];
            validValues.includes(value) ? this._linkStyle = value : this.handleInvalid(this.linkStyleMessage(value, validValues));
        }

    constructor( public elemRef: ElementRef ) {

        this.tagName = elemRef.nativeElement.tagName.toLowerCase();
    }
    
    handleInvalid(content: string) {
        console.warn(content);
    }

    linkStyleMessage(value: string, validList: Array<string>) {
        return `'${value}' is an invalid value for the <${this.tagName}> component's 'linkStyle' input. Allowed values are: ${validList}`;
    }

    scrollToIdValueMessage(value: string) {
        return `Element with an id='${value}' could not be found. Please provide a valid element id to the <${this.tagName}> component's 'linkScrollToId' input. \nElement with the id='${this._linkScrollToId}' will be used instead.`;
    }

    checkScrollToIdValue(value: string) {
        const elementRef = document.getElementById(value);
        
        if (elementRef) {
            const elementName = elementRef.tagName.toString().toLowerCase();
            const doNotModify: Array<string> = ['a', 'button'];
            const modifyElement = !doNotModify.includes(elementName);

            if (modifyElement) {
                elementRef.setAttribute('tabindex', '0');
            }

            return value;

        } else {
            this.handleInvalid(this.scrollToIdValueMessage(value));
            return this._linkScrollToId;
        }
    }

    linkClick(isActive: boolean) {
        // Scroll (and move focus) to the top of the main content area when using footer navigation
        if (isActive) return;

        const scrollToElementNode = document.getElementById(this.linkScrollToId);
       
        if (this.linkScrollTo && scrollToElementNode) {
            setTimeout(() => {
                scrollToElementNode.scrollIntoView({ behavior: "smooth", block: 'start' });
                scrollToElementNode.focus({preventScroll: true});
            }, this.linkScrollDelay);
        }
    }

}
