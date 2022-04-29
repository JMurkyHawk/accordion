import { Component, ViewEncapsulation } from '@angular/core';
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

    constructor(
        private route: ActivatedRoute
    ) {

    }

    onActivate() {
        this.routeIdNumber = this.route.firstChild!.snapshot.data['routeIdNumber'];
    }

}
