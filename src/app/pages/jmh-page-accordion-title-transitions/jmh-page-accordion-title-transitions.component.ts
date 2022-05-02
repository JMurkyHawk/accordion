import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-title-transitions',
  templateUrl: './jmh-page-accordion-title-transitions.component.html',
  styleUrls: ['./jmh-page-accordion-title-transitions.component.scss']
})
export class JmhPageAccordionTitleTransitionsComponent implements OnInit {

    public jmAcc_title_trans_title: string = "Accordion Title Transitions";

    public jmAcc_title_full_title: string = "Full Transition"
    public jmAcc_title_full_description: string = "The accordion component will use different title text when the component is open and closed.";
    public jmAcc_title_full_description0: string = "To use this option, set titleTransition to full: ";
    public jmAcc_title_full_code: string = "<span class=\'color2\'>titleTransition</span>=\'<span class=\'color7\'>full</span>\'";
    public jmAcc_title_full_description1: string = " The icon, title, and content will animate when the component opens and closes.";
    public jmAcc_title_full_header1: string = "Hide full title change content";
    public jmAcc_title_full_header2: string = "Show full title change content";
    public jmAcc_title_full_content: string = "Content for full accordion title transition";

    public jmAcc_title_partial_title: string = "Partial Transition";
    public jmAcc_title_partial_description: string = "The accordion component will use different title text that will animate only the partial title text that will change when the component is open and closed.";
    public jmAcc_title_partial_description1: string = "The icon, partial title text, and content will animate when the component opens and closes.";
    public jmAcc_title_partial_header3: string = "partial title change content";
    public jmAcc_title_partial_content: string = "Content for partial accordion title transition";

    constructor() { }

    ngOnInit(): void {
    }

}
