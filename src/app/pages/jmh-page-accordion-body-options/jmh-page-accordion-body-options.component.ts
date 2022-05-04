import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-body-options',
  templateUrl: './jmh-page-accordion-body-options.component.html',
  styleUrls: ['./jmh-page-accordion-body-options.component.scss']
})
export class JmhPageAccordionBodyOptionsComponent implements OnInit {

    public opts_body_title: string = "Accordion Body Options";

    public open_title: string = "Accordion open by default";
    public open_description: string = "Content displayed by default.";
    public open_header: string = "accordion open by default content";
    public open_content: string = "Open by default";
    public open_description1: string = "The component can be set to display it's content when the component is created."

    public height_title: string = "Fixed content height";
    public height_description: string = "Accordion has fixed height when open";
    public height_description1: string = "The accordion component can use a fixed, custom height when opened, and will then scroll any overflow content.";
    public height_description2: string = "The height can be assigned using any css length unit, such as px, em, or vh (among others).";
    public height_header: string = "accordion custom height content";
    public height_heightValue: string = "10em";
    public height_content1: string = "<p>Accordion body has a custom height of " + this.height_heightValue + ".</p> ";
    public height_content2: string = "<p>Additional content for scrolling.</p> "
        + "<p>Additional content for scrolling.</p> "
        + "<p>Additional content for scrolling.</p> "
        + "<p>Additional content for scrolling.</p> ";
    
    constructor() { }

    ngOnInit(): void {
    }

}
