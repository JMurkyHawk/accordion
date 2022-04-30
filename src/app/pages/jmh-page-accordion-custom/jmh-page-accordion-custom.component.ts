import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-custom',
  templateUrl: './jmh-page-accordion-custom.component.html',
  styleUrls: ['./jmh-page-accordion-custom.component.scss']
})
export class JmhPageAccordionCustomComponent implements OnInit {

    public jmAcc_custom_title: string = "Custom styling";

    public jmAcc_custom: string = "The component can be assigned a custom color theme, either globally or individually. " 
        + "For illustrative purposes, the component types will be assigned an 'error' type color scheme.";

    public jmAcc_custom_basic_title: string = "Basic";
    public jmAcc_custom_minimal_title: string = "Minimal";
    public jmAcc_custom_panel_title: string = "Panel";

    public jmAcc_custom_header: string = "custom accordion styling example content";
    public jmAcc_custom_content: string = "Custom accordion styling";
    public jmAcc_custom0: string = "The accordion component can use custom styling.";
    public jmAcc_custom1: string = "For the Basic accordion type, the accordion title and body text color can use custom values.";
    public jmAcc_custom1_1: string = "The Minimal accordion type can accept custom values for both the title and body text color, and the text underline can also be customized via the border property.";
    public jmAcc_custom1_2: string = "The accordion Panel type allows the title's background color, text color, and borders to use custom values for the title's normal and hover/focus states. "; 
    public jmAcc_custom2: string = "The accordion Panel type's component body can also be assigned its own custom background color, text color, and borders. ";
    
    public jmAcc_custom3: string = "Implementing custom styling";
    public jmAcc_custom3_0: string = "This can be done by changing the accordion-specific custom css variables, either in the component's style sheet or the application's global style sheet. "
        + "This could also be done via inputs on the component instance itself. "
        + "Global accordion styling is best done via css variables. "
    public jmAcc_custom3_1: string = "Note: the border properties use the css shorthand: width type color. "
        + "For example: 2px solid #ff0000. "
        + "Properties available to customize the component title, and their corresponding css variables for use in the global stylesheet: ";
    
    public objectKeys = Object.keys;
    public jmAcc_custom_title_styling: { [key: string ] : string } = {
        "Heading background color" : "--jm-acc-head-background",
        "Heading background color on hover/focus" : "--jm-acc-head-background-ro",
        "Heading border" : "--jm-acc-head-border",
        "Heading border on hover/focus" : "--jm-acc-head-border-ro",
        "Heading text color" : "--jm-acc-head-color",
        "Heading text color on hover/focus" : "--jm-acc-head-color-ro"
    };
    
    public jmAcc_custom3_2: string = "Properties available to customize the component content, and their corresponding css variables for use in the global stylesheet: ";
    public jmAcc_custom_content_styling: { [key: string ] : string } = {
        "Content background color" : "--jm-acc-background",
        "Content border" : "--jm-acc-border",
        "Content text color" : "--jm-acc-color"
    };

    public jmAcc_custom4_1: string = "For customizing individual component instance styles: " 
    public jmAcc_custom4_2: string = "Provide custom values as an object to the <j-murky-hawk-accordion> component. "
    public jmAcc_custom4_3: string = "";
    public jmAcc_custom4_4: string = "Alternately, apply a custom style class to the container, then updating the accordion css variables inside a selector for the custom style class. ";
    public jmAcc_custom4_5: string = "Custom title styles are provided via the 'customStylesTitle' input. "
    
    public jmAcc_custom_samples: string = "Implementation code samples";
    
    public jmAcc_customCodeIntro: string = "Example: ";
    public jmAcc_custom4_6: string = 
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

    public jmAcc_custom4_7: string = "Custom content styles are provided via 'customStylesBody'. ";
    public jmAcc_custom4_8: string = 
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