import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, ParamMap, Router, RouterOutlet, RoutesRecognized, Scroll } from '@angular/router';
import { Event as NavigationEvent } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { BehaviorSubject, fromEvent, Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { delay, filter, map, mergeMap, pairwise, switchMap } from 'rxjs/operators';

import { JmhRouteAnimation } from './app-animations';
import { ViewportScroller } from '@angular/common';

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
    public angularVersion: string = VERSION.full;
    public activeLinkTitle: string = 'Current page';

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

    scrollToMainContent(event: any) {
        setTimeout(() => {
            this.skipLinksAnchor.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
            this.skipLinksAnchor.nativeElement.focus({preventScroll: true});
            this.skipLinksAnchor.nativeElement.blur();
        }, 550);
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

                    // mainContentComponent.children[2].setAttribute('style', 'position: absolute;');
                    // mainContentComponent.children[3].setAttribute('style', 'position: absolute;');

                    // setTimeout(() => {
                    //     mainContentComponent.children[2].removeAttribute('style');
                    //     mainContentComponent.children[3].removeAttribute('style');
                    // }, 20000 )
                }

    }

}
