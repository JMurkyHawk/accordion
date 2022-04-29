import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JmhPageAccordionOverviewComponent } from './pages/jmh-page-accordion-overview/jmh-page-accordion-overview.component';
import { JmhPageAccordionTitleTransitionsComponent } from './pages/jmh-page-accordion-title-transitions/jmh-page-accordion-title-transitions.component';
import { JmhPageAccordionTitleOptionsComponent } from './pages/jmh-page-accordion-title-options/jmh-page-accordion-title-options.component';
import { JmhPageAccordionBodyOptionsComponent } from './pages/jmh-page-accordion-body-options/jmh-page-accordion-body-options.component';
import { JmhPageAccordionCustomComponent } from './pages/jmh-page-accordion-custom/jmh-page-accordion-custom.component';
import { JmhPageAccordionTypeComponent } from './pages/jmh-page-accordion-type/jmh-page-accordion-type.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'accordion-overview',
        pathMatch: 'full'
    },
    {
        path: 'accordion-overview',
        component: JmhPageAccordionOverviewComponent,
        data: { routeIdNumber: 0 }
    },
    {
        path: 'accordion-type',
        component: JmhPageAccordionTypeComponent,
        data: { routeIdNumber: 1 }
    },
    {
        path: 'accordion-title-transition',
        component: JmhPageAccordionTitleTransitionsComponent,
        data: { routeIdNumber: 2 }
    },
    {
        path: 'accordion-title-options',
        component: JmhPageAccordionTitleOptionsComponent,
        data: { routeIdNumber: 3 }
    },
    {
        path: 'accordion-body-options',
        component: JmhPageAccordionBodyOptionsComponent,
        data: { routeIdNumber: 4 }
    },
    {
        path: 'accordion-custom',
        component: JmhPageAccordionCustomComponent,
        data: { routeIdNumber: 5 }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { routeIdNumber: 10 }
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
