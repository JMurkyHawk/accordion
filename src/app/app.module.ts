import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import { JMurkyHawkDrawerComponent } from './components/j-murky-hawk-drawer/j-murky-hawk-drawer.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ComponentsModule,
        PagesModule,
        HttpClientModule,
        JMurkyHawkDrawerComponent
    ],
    providers: [
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
