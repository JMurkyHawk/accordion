import { ClickOutsideDirective } from './click-outside.directive';

import { Component, ElementRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
    standalone: true,
    template: `
        <div id="wrapper">
            <div (clickOutsite)="testClickOutside()"></div>
        </div>`,
    imports: [ClickOutsideDirective]
})
class TestComponent {
    constructor( public elemRef: ElementRef ) {}
};

describe('ClickOutsideDirective', () => {
    let component = TestComponent;

    beforeEach(() => {
        let fixture = TestBed.configureTestingModule({
            imports: [ClickOutsideDirective, TestComponent]
        });

    });

    it('should create an instance', () => {
        
    });
});
