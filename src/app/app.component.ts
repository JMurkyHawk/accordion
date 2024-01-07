import { Component, ElementRef, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JmhRouteAnimation } from './app-animations';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [ JmhRouteAnimation ]
})
export class AppComponent {

    public routeIdNumber: number = NaN;
    private skipLinksButtonPosition: number = NaN;

    public title: string = 'Angular Accordion Component Demo';
    public githubLabel: string = 'View Code In GitHub';
    public navHeading: string = 'Accordion Component Options';
    public skipLinksText: string = 'Skip Navigation';
    public skipLinksAnchorText: string = 'Main Content Area';
    public angularVersion: string = VERSION.full;
    public activeLinkTitle: string = 'Current page';
    public footerNote: string = `Accordion and demo use Angular version ${this.angularVersion}`;

    public navLinkData = [{
        label: 'Overview',
        link: 'accordion-overview'
    },
    {
        label: 'Display Types',
        link: 'accordion-type'
    },
    {
        label: 'Title Transitions',
        link: 'accordion-title-transition'
    },
    {
        label: 'Title Options',
        link: 'accordion-title-options'
    },
    {
        label: 'Body Options',
        link: 'accordion-body-options'
    },
    {
        label: 'Custom Styling',
        link: 'accordion-custom'
    },
    {
        label: 'Output Info',
        link: 'accordion-output'
    }]; 

    @ViewChild("skipLinks", {static: false}) skipLinks!: ElementRef;
    @ViewChild("mainContent", {static: false}) mainContent!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }
    
    ngAfterViewInit() {
        this.skipLinksButtonPosition = this.skipLinksButtonCalc();
    }

    skipLinksButtonCalc() {
        const button = this.skipLinks.nativeElement.getBoundingClientRect();
        const buttonTop = button.top;
        const buttonShowTop = buttonTop - button.height;
        return buttonShowTop;
    }

    skipLinksClick(event: any) {
        this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.mainContent.nativeElement.focus({preventScroll: true});
    }

    skipLinksFocus(event: any) {
        window.scrollTo({
            top: this.skipLinksButtonPosition,
            behavior: 'smooth'
        })
    }

    jmRouteAnimationStart(event: any) {
        /* Trying to get the new page (this.mainContent.nativeElement.children[2]) height from ANY of the router events results in an incorrect page height. 
        No idea why, nothing worked. The only place that I've been able to get the correct height is when the route transition animation starts. 
        A slight delay in the JmhRouteAnimation will allow the setMainContentSize() method to get the correct page measurements and animate the mainContent area's height smoothly, preventing the footer 'jumping' on router navigation. 
        I don't like having to use an arbitrary time delay, but it's the only thing that seems to work... */
        this.mainContent.nativeElement.children[2] ? this.setMainContentSize() : undefined;
    }

    jmRouteAnimationDone(event: any) {
        this.mainContent.nativeElement.removeAttribute('style');
    }

    onActivate() {
        this.routeIdNumber = this.route.firstChild!.snapshot.data['routeIdNumber'];
    }

    setMainContentSize() {

        let mainComponent = this.mainContent.nativeElement;
        let leaveHeight = mainComponent.children[1].offsetHeight;
        let enterHeight = mainComponent.children[2].offsetHeight;

        mainComponent.setAttribute('style', 'height: ' + leaveHeight + 'px');
        setTimeout(() => {
            mainComponent.setAttribute('style', 'height: ' + enterHeight + 'px' );
        });

    }

}
