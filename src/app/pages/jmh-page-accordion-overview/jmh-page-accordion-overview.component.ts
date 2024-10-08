import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jmh-page-accordion-overview',
    templateUrl: './jmh-page-accordion-overview.component.html',
    styleUrls: ['./jmh-page-accordion-overview.component.scss']
})
export class JmhPageAccordionOverviewComponent implements OnInit {

    public overview_title: string = "Accordion Component Overview";
    public overview_content: string = "This is a small demo app for one of the Angular components I've built. ";
    public overview_content1: string = "While there are other accordion components available on the web, like the Angular Material <a target='_blank' href='https://material.angular.io/components/expansion/examples'>Expansion Panel</a>, the accordion I built also has some additional animation features that I couldn't find anywhere else. ";
    public overview_content2: string = "I wanted an expandable/collapsible component that not only had the ability to animate the content being hidden and shown, but also allowed title text changes to transition in a fluid manner. "
        + "See the samples documented on these pages for options and examples of what this component has available. ";
    
    public default_title: string = "Accordion default implementation";
    public default_description: string = "Default accordion"
    public default_description1: string = "The open/close icon and the accordion content are both animated when the component opens and closes.";
    public default_header: string = "default accordion example";
    public default_content: string = "Default accordion content";

    constructor() { }

    ngOnInit() {
    }

}
