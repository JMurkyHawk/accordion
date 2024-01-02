import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jmh-page-accordion-output',
  templateUrl: './jmh-page-accordion-output.component.html',
  styleUrl: './jmh-page-accordion-output.component.scss'
})
export class JmhPageAccordionOutputComponent {

    public emittedObj: Object = {};
    public emittedId: string = "---";
    public emittedState: string = "---";

    public emit_title: string = "Accordion Output Info";

    public emit0: string = "Emitting individual component information";
    public emit: string = "The accordion component can emit information about itself when it is opened or closed.";
    public emit1: string = "The emitted information includes the selected component's ID and whether or not the accordion is in its open state. Access this by setting the emitInfo input to true, then get the emitted object via the clickHeader output.";

    public emit_basic_title: string = "Activated accordion's output info";
    public emit_info1: string = "Activated accordion's id:  ";
    public emit_info2: string = "Activated accordion's state:  ";

    public emit_id1: string = "accordion-1";
    public emit_header: string = "content for accordion with id of " + this.emit_id1;
    public emit_content: string = "Accordion with id of accordion-1 body content.";

    public emit_id2: string = "accordion-2";
    public emit_header_2: string = "content for accordion with id of " + this.emit_id2;
    public emit_content_2: string = "Accordion with id of accordion-2 body content.";

    public emit_id3: string = "accordion-3";
    public emit_header_3: string = "content for accordion with id of " + this.emit_id3;
    public emit_content_3: string = "Accordion with id of accordion-3 body content.";

    constructor () {}

    getAccordionInfo(event: any) {
        this.emittedObj = JSON.stringify(event, null, 4);
        this.emittedId = event.id;
        this.emittedState = event.open ? 'open' : 'closed';
    }
}
