import { Component, Input } from '@angular/core';

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

    public _linkType: any = 'button';

    public activeLink:string = 'routerLinkActive';
    public activeLinkTitle: string = 'Current page';
    public navLinkData: Array<LinkData> = [{label: 'Please provide link data list', link: '' }]

    @Input() navItems: Array<LinkData> = this.navLinkData;
    @Input() linkScrollToTop: boolean = false;
    @Input() scrollToTopDelay: number = 550;
    @Input() scrollToElement: string = 'skipLinksAnchor';
    @Input() 
        // Set the appearance of the navigation links: 'button' (apply .btn style class) or 'text' (styled text link)
        public get linkType() {
            return this._linkType;
        }

        public set linkType(value: string) {
            let validValues = ['button', 'text'];
            validValues.includes(value) ? this._linkType = value : console.error(`Allowed values for <j-murky-hawk-navigation are: ${validValues}`);
        }

    constructor() {}

    linkClick() {
        // Scroll (and move focus) to the top of the main content area when using footer navigation
        let scrollToElementNode = document.getElementById(this.scrollToElement);
        setTimeout(() => {
            if (this.linkScrollToTop && scrollToElementNode) {
                scrollToElementNode.scrollIntoView({ behavior: "smooth", block: 'start' });
                scrollToElementNode.focus({preventScroll: true});
                scrollToElementNode.blur();
            }
        }, this.scrollToTopDelay);
    }

}
