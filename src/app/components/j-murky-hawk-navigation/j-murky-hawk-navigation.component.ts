import { Component, ElementRef, Input, reflectComponentType } from '@angular/core';

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

    public _linkType: string = 'button';
    public _linkScrollToId: string = 'mainContent';

    public tagName: string = '';
    public activeLink:string = 'routerLinkActive';
    public activeLinkTitle: string = 'Current page';
    public navLinkData: Array<LinkData> = [{label: 'Please provide link data list', link: '' }]

    @Input() navItems: Array<LinkData> = this.navLinkData;
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
        public get linkType() {
            return this._linkType;
        }

        public set linkType(value: string) {
            let validValues: Array<string> = ['button', 'text'];
            validValues.includes(value) ? this._linkType = value : this.linkTypeMessage(value, validValues);
        }

    constructor(elemRef: ElementRef) {
        this.tagName = elemRef.nativeElement.tagName.toLowerCase();
    }

    linkTypeMessage(value: string, validList: Array<string>) {
        console.warn(`'${value}' is an invalid value for the <${this.tagName}> component's 'linkType' input. Allowed values are: ${validList}`);
    }

    scrollToIdValueMessage(value: string) {
        console.warn(`No element with an id='${value}' could not be found in the document. Please provide a valid element id to the <${this.tagName}> component's 'linkScrollToId' input. \nThe element with an id='${this._linkScrollToId}' will be used instead.`);
    }

    checkScrollToIdValue(value: string) {;
        if (document.getElementById(value)) {
            document.getElementById(value)?.setAttribute('tabindex', '0');
            return value;
        } else {
            this.scrollToIdValueMessage(value);
            return this._linkScrollToId;
        }
    }

    linkClick() {
        // Scroll (and move focus) to the top of the main content area when using footer navigation
        const scrollToElementNode = document.getElementById(this.linkScrollToId);
        setTimeout(() => {
            if (this.linkScrollTo && scrollToElementNode) {
                scrollToElementNode.scrollIntoView({ behavior: "smooth", block: 'start' });
                scrollToElementNode.focus({preventScroll: true});
            }
        }, this.linkScrollDelay);
    }

}
