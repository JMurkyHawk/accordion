import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ClickOutsideDirective } from '../directives/click-outside.directive';

import { JMurkyHawkAccordionComponent } from './j-murky-hawk-accordion/j-murky-hawk-accordion.component';
import { JMurkyHawkSvgRenderComponent } from './j-murky-hawk-svg-render/j-murky-hawk-svg-render.component';
import { JMurkyHawkNavigationComponent } from './j-murky-hawk-navigation/j-murky-hawk-navigation.component';

@NgModule({
    declarations: [
        JMurkyHawkAccordionComponent, 
        JMurkyHawkSvgRenderComponent,
        JMurkyHawkNavigationComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
        ClickOutsideDirective
    ],
    exports: [
        JMurkyHawkAccordionComponent, 
        JMurkyHawkSvgRenderComponent,
        JMurkyHawkNavigationComponent
    ]
})
export class ComponentsModule { }
