import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-body-options',
  templateUrl: './jmh-page-accordion-body-options.component.html',
  styleUrls: ['./jmh-page-accordion-body-options.component.scss']
})
export class JmhPageAccordionBodyOptionsComponent implements OnInit {

    public jmAcc_opts_body_title: string = "Accordion Body Options";

    public jmAcc_open_Title: string = "Accordion open by default";
    public jmAcc_open_Description: string = "Content displayed by default.";
    public jmAcc_open_Header: string = "accordion open by default content";
    public jmAcc_open_Content: string = "Open by default";
    public jmAcc_open_Description1: string = "The component can be set to display it's content when the component is created."

    public jmAcc_height_Title: string = "Fixed content height";
    public jmAcc_height_Description: string = "Accordion has fixed height when open";
    public jmAcc_height_Description1: string = "The accordion component can use a fixed, custom height when opened, and will then scroll any overflow content.";
    public jmAcc_height_Description2: string = "The height can be assigned using any css length unit, such as px, em, or vh (among others).";
    public jmAcc_height_Header: string = "accordion custom height content";
    public jmAcc_height_HeightValue: string = "10em";
    public jmAcc_height_Content1: string = "<p>Accordion body has a custom height of " + this.jmAcc_height_HeightValue + ".</p> ";
    public jmAcc_height_Content2: string = "<p>Additional content for scrolling.</p> "
        + "<p>Additional content for scrolling.</p> "
        + "<p>Additional content for scrolling.</p> "
        + "<p>Additional content for scrolling.</p> ";
    
    constructor() { }

    ngOnInit(): void {
    }

}
