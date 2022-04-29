import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JMurkyHawkAccordionComponent } from './j-murky-hawk-accordion/j-murky-hawk-accordion.component';
import { JMurkyHawkSvgRenderComponent } from './j-murky-hawk-svg-render/j-murky-hawk-svg-render.component';

@NgModule({
    declarations: [
        JMurkyHawkAccordionComponent, 
        JMurkyHawkSvgRenderComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        JMurkyHawkAccordionComponent, 
        JMurkyHawkSvgRenderComponent
    ]
})
export class ComponentsModule { }
