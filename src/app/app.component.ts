import { Component, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, ParamMap, Router, RouterOutlet, RoutesRecognized, ActivatedRoute } from '@angular/router';

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

    @ViewChild("skipLinksAnchor", {static: false}) skipLinksAnchor!: ElementRef;

    constructor(
        private route: ActivatedRoute
    ) {  }

    skipLinksClick(event: any) {
        event.preventDefault();
        this.skipLinksAnchor.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
        this.skipLinksAnchor.nativeElement.focus({preventScroll: true});
    }

    onActivate() {
        this.routeIdNumber = this.route.firstChild!.snapshot.data['routeIdNumber'];
    }

}
