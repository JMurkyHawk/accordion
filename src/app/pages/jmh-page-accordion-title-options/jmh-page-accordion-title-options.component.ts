import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-title-options',
  templateUrl: './jmh-page-accordion-title-options.component.html',
  styleUrls: ['./jmh-page-accordion-title-options.component.scss']
})
export class JmhPageAccordionTitleOptionsComponent implements OnInit {

    public title_opts_title: string = "Accordion Title Options";

    // Icon Position
    public icon_pos_title: string = "Icon Position";

    public icon_pos_r_header: string = "icon right-aligned content";
    public icon_pos_r_content: string = "Accordion icon positioned to the right-hand side of the accordion header button";
    public icon_pos_r_description: string = 'Open/close icon right-aligned.';

    public icon_pos_l_header: string = "icon left-aligned content";
    public icon_pos_l_content: string = "Accordion icon positioned to the left-hand side of the accordion header button";
    public icon_pos_l_description: string = 'Open/close icon left-aligned.';
    
    public icon_pos_description2: string = 'The accordion component can be configured to allow the open/close icon to be positioned to the left-hand side of the accordion header button.';
    
    // Icon Type
    public icon_type_title: string = "Icon Type";

    public icon_type_c_header: string = "chevron icon content";
    public icon_type_c_content: string = "Accordion utilizing a chevron icon in the accordion header button";
    public icon_type_c_description: string = 'Chevron icon';

    public icon_type_pm_header: string = "plus/minus icon content";
    public icon_type_pm_content: string = "Accordion utilizing a plus/minus icon in the accordion header button";
    public icon_type_pm_description: string = 'Plus/Minus icon';

    public icon_type_description: string = 'The accordion also can be set to utilize a plus/minus sign instead of the upward/downward facing chevron icon.';
    
    public title_align_title: string = "Heading text alignment";

    public title_align_l_header: string = "title align left content";
    public title_align_l_content: string = "Content for accordion title text left aligned";
    public title_align_l_description: string = 'Left align title text';

    public title_align_c_title: string = "Heading text alignment";
    public title_align_c_header: string = "title align center content";
    public title_align_c_content: string = "Content for accordion title text center aligned";
    public title_align_c_description: string = 'Center title text';

    public title_align_r_title: string = "Heading text alignment";
    public title_align_r_header: string = "title align right content";
    public title_align_r_content: string = "Content for accordion title text right aligned";
    public title_align_r_description: string = 'Right align title text';

    public title_align_description: string = "The accordion title text can be aligned to the left, center, or right hand side of the component.";

    public tag_title: string = "HTML Heading Tag";
    public tag_description: string = "Heading using H5 html tag";

    public tag_header: string = "heading type example";
    public tag_content: string = "Accordion with heading type <span class='codeBoxMini2'>&lt;<span class='color1'>h5</span>&gt;</span>. Verify this accordion's clickable heading is now wrapped in an <span class='codeBoxMini2'>&lt;<span class='color1'>h5</span>&gt;</span> tag with the browser's DOM inspector.";
    
    public tag_description1: string = "The accordion component has a heading type that can be changed for usability and 508 compliance purposes.";
    public tag_description2: string = "The accordion heading will default to using the <span class='codeBoxMini2'>&lt;<span class='color1'>strong</span>&gt;</span> tag. This can be changed to use any html heading type: ";
    public tag_code1: string = "&lt;<span class='color1'>h1</span>&gt;";
    public tag_code2: string = "&lt;<span class='color1'>h2</span>&gt;";
    public tag_code3: string = "&lt;<span class='color1'>h3</span>&gt;";
    public tag_code4: string = "&lt;<span class='color1'>h4</span>&gt;";
    public tag_code5: string = "&lt;<span class='color1'>h5</span>&gt;";
    public tag_code6: string = "&lt;<span class='color1'>h6</span>&gt;";
    public tag_description2_1: string = "This option will likely be unnoticed by most end-users. "
        + "This is something that will be helpful for users that require assistive technology like screenreaders.";
    public tag_description3: string = "To use a heading type other than <span class='codeBoxMini2'>&lt;<span class='color1'>strong</span>&gt;</span>, select one of the html heading types listed above and assign it to the 'titleTagType' input. ";
    
    constructor() { }

    ngOnInit(): void {
    }

}
