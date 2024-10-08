import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JmhPageAccordionOverviewComponent } from './pages/jmh-page-accordion-overview/jmh-page-accordion-overview.component';
import { JmhPageAccordionTitleTransitionsComponent } from './pages/jmh-page-accordion-title-transitions/jmh-page-accordion-title-transitions.component';
import { JmhPageAccordionTitleOptionsComponent } from './pages/jmh-page-accordion-title-options/jmh-page-accordion-title-options.component';
import { JmhPageAccordionBodyOptionsComponent } from './pages/jmh-page-accordion-body-options/jmh-page-accordion-body-options.component';
import { JmhPageAccordionCustomComponent } from './pages/jmh-page-accordion-custom/jmh-page-accordion-custom.component';
import { JmhPageAccordionTypeComponent } from './pages/jmh-page-accordion-type/jmh-page-accordion-type.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { JmhPageAccordionOutputComponent } from './pages/jmh-page-accordion-output/jmh-page-accordion-output.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'accordion-overview',
        pathMatch: 'full'
    },
    {
        path: 'accordion-overview',
        component: JmhPageAccordionOverviewComponent,
        data: { routeIdNumber: 0, pageTitle: 'Overview' }
    },
    {
        path: 'accordion-type',
        component: JmhPageAccordionTypeComponent,
        data: { routeIdNumber: 1, pageTitle: 'Display type' }
    },
    {
        path: 'accordion-title-transition',
        component: JmhPageAccordionTitleTransitionsComponent,
        data: { routeIdNumber: 2, pageTitle: 'Title transitions' }
    },
    {
        path: 'accordion-title-options',
        component: JmhPageAccordionTitleOptionsComponent,
        data: { routeIdNumber: 3, pageTitle: 'Title options' }
    },
    {
        path: 'accordion-body-options',
        component: JmhPageAccordionBodyOptionsComponent,
        data: { routeIdNumber: 4, pageTitle: 'Body options' }
    },
    {
        path: 'accordion-custom',
        component: JmhPageAccordionCustomComponent,
        data: { routeIdNumber: 5, pageTitle: 'Custom Styling' }
    },
    {
        path: 'accordion-output',
        component: JmhPageAccordionOutputComponent,
        data: { routeIdNumber: 6, pageTitle: 'Output Info' }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { routeIdNumber: 10, pageTitle: 'Page not found' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
