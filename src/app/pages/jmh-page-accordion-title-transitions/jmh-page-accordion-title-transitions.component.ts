import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-title-transitions',
  templateUrl: './jmh-page-accordion-title-transitions.component.html',
  styleUrls: ['./jmh-page-accordion-title-transitions.component.scss']
})
export class JmhPageAccordionTitleTransitionsComponent implements OnInit {

    public title: string = "Accordion Title Transitions";

    public full_title: string = "Full Transition"
    public full_description: string = "The accordion component will use different title text when the component is open and closed.";
    public full_description0: string = "To use this option, set titleTransition to full: ";
    public full_code: string = "<span class=\'color2\'>titleTransition</span>=\'<span class=\'color7\'>full</span>\'";
    public full_description1: string = " The icon, title, and content will animate when the component opens and closes.";
    public full_header1: string = "Show full title change content";
    public full_header2: string = "Hide full title change content";
    public full_content: string = "Content for full accordion title transition";

    public partial_title: string = "Partial Transition";
    public partial_description: string = "The accordion component will use different title text that will animate only the partial title text that will change when the component is open and closed.";
    public partial_description1: string = "The icon, partial title text, and content will animate when the component opens and closes.";
    public partial_header3: string = "partial title change content";
    public partial_content: string = "Content for partial accordion title transition";

    constructor() { }

    ngOnInit(): void {
    }

}
