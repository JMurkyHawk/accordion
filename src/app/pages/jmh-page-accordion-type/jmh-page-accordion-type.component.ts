import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-type',
  templateUrl: './jmh-page-accordion-type.component.html',
  styleUrls: ['./jmh-page-accordion-type.component.scss']
})
export class JmhPageAccordionTypeComponent implements OnInit {

    public jmAcc_type_title: string = "Accordion Display Types";
    public jmAcc_type_content1: string = "The accordion can be displayed as 1 of 3 types: Basic, Minimal, or Panel. ";
    public jmAcc_type_content1_1: string = "The accordion component defaults to a block display, so it will take the width of its parent container as demonstrated in the example boxes below."

    public jmAcc_type_basic_title: string = "Basic";
    public jmAcc_type_basic: string = "Basic default";
    public jmAcc_type_basic_content1: string = "The most basic, bare-bones option. "  
        + "The icon and accordion content animates when the accordion is opened and closed.";
    public jmAcc_type_basic_content2: string = "The accordion text and icon color for both the title and content can still be changed for the accordion's default and focus/hover states. " 
        + "This can be done globally by targeting the component's available css variables, or individually by providing values to the component instance's appropriate inputs. See the 'Custom Styling' options section for more info. ";

    public jmAcc_type_minimal_title: string = "Minimal";
    public jmAcc_type_minimal: string = "Minimal default";
    public jmAcc_type_minimal_content1: string = "A minimalist appearance. " 
        + "The icon, accordion content, and line separating the title and body animates when the accordion is opened and closed.";
    public jmAcc_type_minimal_content2: string = "The accordion text color and underline separator can still be customized for the accordion's default and focus/hover states. See the 'Custom Styling' section for details. ";
    
    public jmAcc_type_panel_title: string = "Panel";
    public jmAcc_type_panel: string = "Panel default";
    public jmAcc_type_panel_content1: string = "The component has a panel-type look. " 
        + "The icon and accordion content will animate when the accordion is opened and closed.";
    public jmAcc_type_panel_content2: string = "The accordion title and body background, border, and text colors can be customized. See the 'Custom Styling' section for details.";
        
    public jmAcc_type_title2: string = "Additional Information";
    public jmAcc_type_content2: string = "All 3 accordion types can still be used in conjunction with any of the other options available. "
        + "For example, here is the minimalist accordion type with: "
    public jmAcc_type_li: Array<string> = [
        "the partial title change transition enabled ",
        "utlizing a plus/minus icon ",
        "the icon is set to be left-aligned "
    ];

    // Accordion components text values
    public jmAcc_basic_header: string = "Basic accordion type";
    public jmAcc_basic_content: string = "Content for basic accordion";
    public jmAcc_minimal_header: string = "Accordion with separation line";
    public jmAcc_minimal_content: string = "Content for accordion with separation line";
    public jmAcc_panel_header: string = "Accordion with panel styling";
    public jmAcc_panel_content: string = "Content for accordion with panel styling";

    public jmAcc_title_change_type_header1: string = "Show";
    public jmAcc_title_change_type_header2: string = "Hide";
    public jmAcc_title_change_type_header3: string = "accordion with partial title change content";
    public jmAcc_title_change_type_content: string = "Content for accordion with additional options";

    constructor() { }

    ngOnInit(): void {
    }

}
