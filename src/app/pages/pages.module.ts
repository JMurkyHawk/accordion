import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JmhPageAccordionOverviewComponent } from './jmh-page-accordion-overview/jmh-page-accordion-overview.component';
import { JmhPageAccordionCustomComponent } from './jmh-page-accordion-custom/jmh-page-accordion-custom.component';
import { JmhPageAccordionTypeComponent } from './jmh-page-accordion-type/jmh-page-accordion-type.component';
import { JmhPageAccordionTitleTransitionsComponent } from './jmh-page-accordion-title-transitions/jmh-page-accordion-title-transitions.component';
import { JmhPageAccordionTitleOptionsComponent } from './jmh-page-accordion-title-options/jmh-page-accordion-title-options.component';
import { JmhPageAccordionBodyOptionsComponent } from './jmh-page-accordion-body-options/jmh-page-accordion-body-options.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    JmhPageAccordionOverviewComponent,
    JmhPageAccordionCustomComponent,
    JmhPageAccordionTypeComponent,
    JmhPageAccordionTitleTransitionsComponent,
    JmhPageAccordionTitleOptionsComponent,
    JmhPageAccordionBodyOptionsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    PageNotFoundComponent,
    JmhPageAccordionOverviewComponent,
    JmhPageAccordionCustomComponent,
    JmhPageAccordionTypeComponent,
    JmhPageAccordionTitleTransitionsComponent,
    JmhPageAccordionTitleOptionsComponent,
    JmhPageAccordionBodyOptionsComponent
  ]
})
export class PagesModule { }
