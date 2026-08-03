import { Component, ElementRef, HostListener, input, output, ViewChild, viewChild, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { JMurkyHawkAccordionComponent } from '../j-murky-hawk-accordion/j-murky-hawk-accordion.component';

export interface LinkData {
    label: string, 
    link?: string, 
    dropdown?: boolean, 
    subLinks?: Array<{
        label: string, 
        link: string
    }>
};

export interface NavigationData {
    instance: string;
    // isActive: boolean;
}

@Component({
    selector: 'j-murky-hawk-navigation',
    templateUrl: './j-murky-hawk-navigation.component.html',
    styleUrl: './j-murky-hawk-navigation.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: false,
    host: {
        '(document:keydown.escape)': 'onKeyDown()'
    }
})
export class JMurkyHawkNavigationComponent {

    public tagName: string = '';
    public activeLink:string = 'routerLinkActive';
    public activeLinkTitle: string = 'Current page';
    public emittedId: string = "---";
    public emittedState: string = "---";
    private delayValue: number = 125;
    public _linkScrollToId: string = 'mainContent';

    public linkScrollToId = input<string, string>('', {
        transform: (value: string) => {
            this._linkScrollToId = this.checkScrollToIdValue(value);

            return this._linkScrollToId;
        }
    })

    public linkStyle = input<string, string>('button', {
        transform: (value: string) => {
            const validValues: Array<string> = ['button', 'text'];
            
            if (validValues.includes(value)) {
                return value;
            }
    
            // Handle the invalid state (side-effect)
            this.handleInvalid(this.linkStyleMessage(value, validValues));
            
            // Return a fallback value (e.g., the current default) so the signal remains safe
            return 'button';
        }
    });

    public listId = input<string>(''); // To add a unique id (listId + index) to each <a> tag - otherwise, no id will be added
    public navItems = input<Array<LinkData>>([
        { label: 'Please provide link data list', link: '' }
    ]);
    readonly linkScrollTo = input<boolean>(false);
    readonly linkScrollDelay = input<number>(750);
    readonly linkScrollToIfPastId = input<string>('subHeaderBar');

    public readonly clickSubItem = output<NavigationData>();

    readonly navDropdownMenu = viewChild<ElementRef<HTMLElement>>('navDropdownMenu');
    readonly accordionMenu = viewChild(JMurkyHawkAccordionComponent);

    onKeyDown() {
        // Escape key should close the accordion menu
        if ( this.emittedState === 'opened' ) {
            this.accordionMenu()?.jmAccordionToggle();
        }
    }

    constructor( 
        public elemRef: ElementRef,
        public navigationService: NavigationService
    ) {
        this.tagName = elemRef.nativeElement.tagName.toLowerCase();
    }

    ngOnInit() {
        
    }

    handleInvalid(content: string) {
        console.warn(content);
    }

    accordionOutputHandler(event: any) {
        this.emittedId = event.id;
        this.emittedState = event.open ? 'opened' : 'closed';
    }

    closeAccordion() {
        if (this.emittedState === 'opened') {
            this.accordionMenu()?.jmAccordionToggle();
        }
    }

    accordionMenuItemClick(event: any) {
        if ( event.target.getAttribute('disabled') !== 'true' ) {
            setTimeout(() => {
                this.accordionMenu()?.jmAccordionToggle();
                this.navDropdownMenu()?.nativeElement.getElementsByTagName('button')[0].focus({focusVisible: true} as any);
            }, this.delayValue);
        }
    }

    emitNavItemInfo(instance: any) {
        // console.log(`instance: ${Object.entries(instance)}`);
        // console.log(`test the instance: ${JSON.stringify(instance.element)}`);
        this.clickSubItem.emit({'instance': instance});
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

    // Is window scrolled past element with id provided to linkScrollToIfPastId input?
    isScrolledPast = (elementId: string) => {
        if (elementId !== null && document.getElementById(elementId) !== undefined) {
            return document.getElementById(elementId)?.getBoundingClientRect().bottom! < 0;
        } else {
            return true;
        }
    }

    linkClick(instance: any, clickedId: string) {
        if (instance.isActive) return;
        // this.navigationService.isActiveItem(instance);
        this.navigationService.navItemInfo(instance, clickedId);

        // Scroll (and move focus) to the top of the main content area when using footer navigation
        const scrollToElementNode = document.getElementById(this.linkScrollToId());

        // Should clicking the link scroll to the scrollToElementNode page position
        if (this.linkScrollTo() && scrollToElementNode && this.isScrolledPast(this.linkScrollToIfPastId()) ) {
            setTimeout(() => {
                scrollToElementNode.scrollIntoView({ behavior: "smooth", block: 'start' });
                scrollToElementNode.focus({preventScroll: true});
            }, this.linkScrollDelay());
        }
    }

}
