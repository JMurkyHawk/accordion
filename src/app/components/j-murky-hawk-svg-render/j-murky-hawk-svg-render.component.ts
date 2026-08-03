import { Component, OnInit, viewChild, ViewEncapsulation, ElementRef, input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jm-svg-render',
    templateUrl: './j-murky-hawk-svg-render.component.html',
    styleUrls: ['./j-murky-hawk-svg-render.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class JMurkyHawkSvgRenderComponent implements OnInit {

    // Component renders SVG content in DOM from tag declaration in HTML file to prevent bloat in file: 
    // <jmh-svg-render src='filename.svg'></jmh-svg-render>
    // similar to image tag declaration: <img src='filename.svg' />
    
    readonly src = input.required<string>();

    private jmSvgRenderContainer = viewChild<ElementRef<HTMLElement>>('jmSvgRenderContainer');

    constructor(public http: HttpClient) {}

    ngOnInit() : void {
        // Per Angular's docs, no need to unsubscribe from HttpClient methods: https://angular.io/guide/http-request-data-from-server#starting-the-request
        this.http
        .get(this.src(), {responseType: 'text'})
        .subscribe(data => {
            const container = this.jmSvgRenderContainer()?.nativeElement;
    
            if (container) {
                container.innerHTML = data;
            }
        })
    }

}