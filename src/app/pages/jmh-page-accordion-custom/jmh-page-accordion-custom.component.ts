import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-custom',
  templateUrl: './jmh-page-accordion-custom.component.html',
  styleUrls: ['./jmh-page-accordion-custom.component.scss']
})
export class JmhPageAccordionCustomComponent implements OnInit {

    public custom_title: string = "Custom styling";

    public custom: string = "The component can be assigned a custom color theme, either globally or individually. " 
        + "For illustrative purposes, the component types will be assigned an 'error' type color scheme.";

    public custom_basic_title: string = "Basic";
    public custom_minimal_title: string = "Minimal";
    public custom_panel_title: string = "Panel";

    public custom_header: string = "custom accordion styling example content";
    public custom_content: string = "Custom accordion styling";
    public custom0: string = "The accordion component can use custom styling.";
    public custom1: string = "For the Basic accordion type, the accordion title and body text color can use custom values.";
    public custom1_1: string = "The Minimal accordion type can accept custom values for both the title and body text color, and the text underline can also be customized via the border property.";
    public custom1_2: string = "The accordion Panel type allows the title's background color, text color, and borders to use custom values for the title's normal and hover/focus states. "; 
    public custom2: string = "The accordion Panel type's component body can also be assigned its own custom background color, text color, and borders. ";
    
    public custom_implement_title: string = "Implementing custom styling";
    public custom_implement_sub_title1: string = "Global accordion styling";
    public custom3_0: string = "This can be done by changing the accordion-specific custom css variables, either in the component's style sheet or the application's global style sheet. "
        + "This could also be done via inputs on the component instance itself. "
        + "Global accordion styling is best done via css variables. "
    public custom3_1: string = "<strong>Note:</strong>  the border properties use the css shorthand: border-width border-style border-color. "
        + "<br />For example: 2px solid #ff0000 ";
    public custom3_1_1: string = "Properties available to customize the component title, and their corresponding css variables for use in the global stylesheet: ";
    
    public objectKeys = Object.keys;
    public custom_title_styling: { [key: string ] : string } = {
        "Heading background color" : "--jm-acc-head-background",
        "Heading background color on hover/focus" : "--jm-acc-head-background-ro",
        "Heading border" : "--jm-acc-head-border",
        "Heading border on hover/focus" : "--jm-acc-head-border-ro",
        "Heading text color" : "--jm-acc-head-color",
        "Heading text color on hover/focus" : "--jm-acc-head-color-ro"
    };
    
    public custom3_2: string = "Properties available to customize the component content, and their corresponding css variables for use in the global stylesheet: ";
    public custom_content_styling: { [key: string ] : string } = {
        "Content background color" : "--jm-acc-background",
        "Content border" : "--jm-acc-border",
        "Content text color" : "--jm-acc-color"
    };

    public custom_implement_sub_title1_2: string = "Global implementation";
    public custom3_3: string = "To style all instances of the accordion in the application <strong>without</strong> modifying the component scss file, define the accordion css variables inside a j-murky-hawk-accordion selector. "
        + "If the 'minimal' accordion type is used, only the following values will be applied: ";
    public custom3_3_list: Array<string> = [
        "-jm-acc-head-border", 
        "--jm-acc-head-border-ro",
        "--jm-acc-head-color",
        "--jm-acc-head-color-ro", 
        "--jm-acc-color"
    ];
    public custom3_3_2: string = "For the 'basic' accordion type, only these values will be applied: ";
    public custom3_3_list2: Array<string> = [
        "--jm-acc-head-color", 
        "--jm-acc-head-color-ro", 
        "--jm-acc-color"
    ];

    public custom3_3_3: string = "Copying the following block into the application's global stylesheet would <strong>override all</strong> accordion instances throughout the app (except where custom styling is provided individually, described in the next section) with the values provided: ";
    public custom3_code: string = 
        "<span class='color1'>j-murky-hawk-accordion</span> { \r"
        + "    <span class='color2'>--jm-acc-head-background</span>: <span class='color7'>#4b0082</span>; \r"
        + "    <span class='color2'>--jm-acc-head-background-ro</span>: <span class='color7'>#5f3082</span>; \r"
        + "    <span class='color2'>--jm-acc-head-border</span>: <span class='color7'>2px solid #4b0082</span>; \r"
        + "    <span class='color2'>--jm-acc-head-border-ro</span>: <span class='color7'>2px solid #4b0082</span>; \r"
        + "    <span class='color2'>--jm-acc-head-color</span>: <span class='color7'>#ffffff</span>; \r"
        + "    <span class='color2'>--jm-acc-head-color-ro</span>: <span class='color7'>#ffffff</span>; \r"
        + "\r"
        + "    <span class='color2'>--jm-acc-background</span>: <span class='color7'>#D8BFD8</span>; \r"
        + "    <span class='color2'>--jm-acc-border</span>: <span class='color7'>#4b0082</span>; \r"
        + "    <span class='color2'>--jm-acc-color</span>: <span class='color7'>#000000</span>; \r"
        + "}";

    public custom_implement_sub_title2: string = "Individual accordion styling";
    public custom4_1: string = "To customize individual component instance styling: " 
    public custom4_list: Array<string> = [
        "Provide custom values as an object to the <span class=\"inlineBlock\">&lt;j-murky-hawk-accordion&gt;</span> component. ",
        "Alternately, apply a custom style class to the container, then updating the accordion css variables inside a selector for the custom style class. "
    ];

    public custom_implement_heading_title: string = "Individual title styling"; 

    public custom_single_acc_title_desc: string = "Properties available to customize the component title, and their corresponding key value for the object to pass to the <i>[customStylesTitle]</i> input: "
    public custom_single_acc_title_props: { [key: string ] : string } = {
        "Heading background color" : "background",
        "Heading background color on hover/focus" : "background-ro",
        "Heading border" : "border",
        "Heading border on hover/focus" : "border-ro",
        "Heading text color" : "color",
        "Heading text color on hover/focus" : "color-ro"
    };

    public custom_code_intro: string = "Example: ";
    public custom_single_acc_title_desc2: string = "<strong>Note:</strong>  the -ro appended to the end of each value denotes the rollover (focus/hover) state of that value. ";
    
    public custom_single_acc_title_code: string = 
        "&lt;<span class=\'color1\'>j-murky-hawk-accordion</span> <br />"
        + "    <span class=\'color2\'>jmFieldId</span>=<span class=\'color7\'>\"accordionCustomTitle\"</span> <br />"
        + "    <span class=\'color2\'>titleText</span>=<span class=\'color7\'>\"Sample title text\"</span> <br />"
        + "    <span class=\'color2\'>accordionType</span>=<span class=\'color7\'>\"panel\"</span> <br />"
        + "    [<span class=\'color2\'>customStylesTitle</span>]=<span class='color7'>\"{ <br />"
        + "        'background' : '#cc0031', <br />"
        + "        'background-ro' : '#ffffff', <br />"
        + "        'border' : '3px solid #cc0031', <br />" 
        + "        'border-ro' : '3px solid #cc0031', <br />" 
        + "        'color' : '#ffffff', <br />"
        + "        'color-ro' : '#770031' <br />"
        + "    }\"</span>&gt; <br />"
        + "    &lt;<span class='color1'>p</span>&gt;Sample Accordion Content</span>&lt;/<span class=\'color1'\>p</span>&gt; <br />"
        + "&lt;/<span class='color1'>j-murky-hawk-accordion</span>&gt;";

    public custom_implement_body_title: string = "Individual body styling";
    public custom_single_acc_body_desc: string = "Properties available to customize the component body content, and their corresponding key value for the object to pass to the <i>[customStylesBody]</i> input: "
    public custom_single_acc_body_props: { [key: string ] : string } = {
        "Body content background color" : "background",
        "Body content border" : "border",
        "Body content text color" : "color",
    };
    
    public custom_single_acc_body_code: string = 
        "&lt;<span class=\'color1\'>j-murky-hawk-accordion</span> <br />"
        + "    <span class=\'color2\'>jmFieldId</span>=<span class=\'color7\'>'accordionCustomContent'</span> <br />"
        + "    <span class=\'color2\'>titleText</span>=<span class=\'color7\'>'Sample title text'</span> <br />"
        + "    <span class=\'color2\'>accordionType</span>=<span class=\'color7\'>\"panel\"</span> <br />"
        + "    [<span class=\'color2\'>customStylesBody</span>]=<span class=\'color7\'>\"{ <br />"
        + "        'background' : '#ffeded', <br />"
        + "        'border' : '3px solid #cc0031', <br />"
        + "        'color' : '#770031' <br />"
        + "    }\"</span>&gt; <br />"
        + "    &lt;<span class='color1'>p</span>&gt;Sample Accordion Content</span>&lt;/<span class=\'color1'\>p</span>&gt; <br />"
        + "&lt;/<span class=\'color1\'>j-murky-hawk-accordion</span>&gt;";

  constructor() { }

  ngOnInit() {
  }

}