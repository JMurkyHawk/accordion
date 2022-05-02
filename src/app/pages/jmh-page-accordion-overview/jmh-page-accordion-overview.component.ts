import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jmh-page-accordion-overview',
    templateUrl: './jmh-page-accordion-overview.component.html',
    styleUrls: ['./jmh-page-accordion-overview.component.scss']
})
export class JmhPageAccordionOverviewComponent implements OnInit {

    public jmAcc_Overview_Title: string = "Accordion Component Overview";
    public jmAcc_Overview_Content: string = "This is a repo for <i>one</i> of the Angular components I've built. ";
    public jmAcc_Overview_Content1: string = "While there are other accordion components available on the web, like the Angular Material <a target='_blank' href='https://material.angular.io/components/expansion/examples'>Expansion Panel</a>, the accordion I built also has some additional animation features that I couldn't find anywhere else. ";
    public jmAcc_Overview_Content2: string = "I wanted an expandable/collapsible component that not only had the ability to animate the content being hidden and shown, but also allowed title text changes to transition in a fluid manner. "
        + "See the samples documented on these pages for options and examples of what this component has available. ";
    public jmAcc_Overview_ContentEnd: string = "Full portfolio site";
    public jmAcc_Overview_ContentEnd1: string = "The Angular-based Accordion is one component that I've pulled from my portfolio and posted on its own github repository, so I can provide a sample of some of the work I've done. " 
        + "I've built a number of other Angular components that are showcased on my full portfolio site, which is in the process of being finalized. "
    public jmAcc_Overview_ContentEnd2: string = "I'll link that site here and from my github profile when it's complete."

    public jmAcc_default_Title: string = "Accordion default implementation";
    public jmAcc_default_Description: string = "Default accordion"
    public jmAcc_default_Description1: string = "The open/close icon and the accordion content are both animated when the component opens and closes.";
    public jmAcc_default_Header: string = "Default accordion example";
    public jmAcc_default_Content: string = "Default accordion content";

    constructor() { }

    ngOnInit() {
    }

}
