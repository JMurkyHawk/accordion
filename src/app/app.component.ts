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

    public routeIdNumber!: number;

    public title: string = 'Angular Accordion Component Demo';
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

    @ViewChild("skipLinksAnchor", {static: false}) skipLinksAnchor!: ElementRef;
    @ViewChild("mainContent", {static: false}) mainContent!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    skipLinksClick(event: any) {
        this.skipLinksAnchor.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
        this.skipLinksAnchor.nativeElement.focus({preventScroll: true});
    }

    jmRouteAnimationStart() {
        this.mainContent.nativeElement.children[2] ? this.getMainContentContentSize() : undefined;
    }

    jmRouteAnimationDone() {
        this.mainContent.nativeElement.removeAttribute('style');
    }

    onActivate() {
        this.routeIdNumber = this.route.firstChild!.snapshot.data['routeIdNumber'];
    }

    getMainContentContentSizeInitial() {

        const mainContentComponent = this.mainContent.nativeElement;

        let mainContentLeave = mainContentComponent.children[2];
        let mainContentLeaveRect = mainContentLeave.getBoundingClientRect();
        let mainContentLeaveTop = Math.ceil(mainContentLeaveRect.top);
        let mainContentLeaveBottom = Math.ceil(mainContentLeaveRect.bottom);
        let mainContentLeaveHeight = mainContentLeaveBottom - mainContentLeaveTop;
        
        return mainContentLeaveHeight;

    }

    getMainContentContentSize() {

                let mainContentLeaveHeight = this.getMainContentContentSizeInitial();
                
                let mainContentComponent = this.mainContent.nativeElement;
                let mainContentChildrenSize = mainContentComponent.children.length;
                
                if ( mainContentChildrenSize > 3 ) {

                    let mainContentEnter = mainContentComponent.children[3];
                    let mainContentEnterRect = mainContentEnter.getBoundingClientRect();
                    let mainContentEnterTop = Math.ceil(mainContentEnterRect.top);
                    let mainContentEnterBottom = Math.ceil(mainContentEnterRect.bottom);
                    let mainContentEnterHeight = mainContentEnterBottom - mainContentEnterTop;

                    for ( let i = 0; i < mainContentChildrenSize; i++ ) {

                        let tempMenuItemComponent = mainContentComponent.children[i];
                        
                        if ( tempMenuItemComponent.nodeName != 'ROUTER-OUTLET' ) {
                            
                            mainContentComponent.setAttribute('style', 'height: ' + mainContentLeaveHeight + 'px');
                            tempMenuItemComponent.getBoundingClientRect();

                        }

                    }

                    mainContentComponent.setAttribute('style', 'height: ' + mainContentEnterHeight + 'px' );
                }

    }

}
