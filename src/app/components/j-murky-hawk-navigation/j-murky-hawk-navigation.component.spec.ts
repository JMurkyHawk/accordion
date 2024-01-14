import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { By } from '@angular/platform-browser';

import { JMurkyHawkNavigationComponent } from './j-murky-hawk-navigation.component';

describe('JMurkyHawkNavigationComponent', () => {
    let component: JMurkyHawkNavigationComponent;
    let fixture: ComponentFixture<JMurkyHawkNavigationComponent>;
    let debugElement: DebugElement;
    let linkButton: HTMLElement;
    let links: Array<{label: string, link: string}> = [
        {
            label: 'Test link 1',
            link: '/test-link-1'
        },
        {
            label: 'Test link 2',
            link: '/test-link-2'
        },
        {
            label: 'Test link 3',
            link: '/test-link-3'
        }
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                JMurkyHawkNavigationComponent
            ],
            imports: [
                RouterLinkActive
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JMurkyHawkNavigationComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        component.navItems = links;
        component.linkStyle = 'text';
        linkButton = fixture.nativeElement.querySelector('a');
        fixture.detectChanges();
    })

    const createScrollToElement = (element: string, scrollToId: string) => {
        const checkElement = document.getElementById(scrollToId);
        
        if (checkElement) {
            checkElement.remove();
        }

        document.body
        .appendChild(document.createElement(element))
        .setAttribute('id', scrollToId);
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should execute linkClick() method when <a> link is clicked', () => {

        spyOn(component, 'linkClick');
        let btn = fixture.debugElement.query(By.css('a'));
        expect(btn).toBeTruthy;
        
        btn.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.linkClick).toHaveBeenCalled();
    });

    it('if linkScrollTo="true", <a> link click should scroll default id element into view', fakeAsync(() => {
        createScrollToElement('div', 'mainNavBar');
        component.linkScrollTo = true;
        component.linkScrollToId = 'mainNavBar';
        fixture.detectChanges();

        const doc = fixture.nativeElement.ownerDocument;
        const getScrollToElement = doc.getElementById(component.linkScrollToId);
        expect(getScrollToElement).toBeTruthy;
        
        const btn = fixture.debugElement.query(By.css('a'));
        expect(btn).toBeTruthy;

        spyOn(getScrollToElement, 'scrollIntoView').and.callThrough();
        btn.triggerEventHandler('click', null);
        tick(component.linkScrollDelay);
        expect(getScrollToElement.scrollIntoView).toHaveBeenCalled();
    }));

    it('checkScrollToIdValue() should return the PROVIDED id value if element with that id exists in DOM', () => {
        const scrollToId = 'mainNavBar';
        createScrollToElement('div', 'mainNavBar');

        component.linkScrollTo = true;
        component.linkScrollToId = scrollToId;
        fixture.detectChanges();
        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(component.checkScrollToIdValue(component.linkScrollToId)).toBe(scrollToId);
    });

    it('checkScrollToIdValue() should return the DEFAULT id value if element with that id does NOT exist in DOM', () => {
        const scrollToId = 'id-not-in-dom';
        const defaultIdValue = component.linkScrollToId;
        createScrollToElement('div', 'mainNavBar');

        component.linkScrollTo = true;
        component.linkScrollToId = scrollToId;
        fixture.detectChanges();
        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(component.checkScrollToIdValue(component.linkScrollToId)).toBe(defaultIdValue);
    });

    it('checkScrollToIdValue() should set id element tabindex="0" if element is NOT <a> or <button>', () => {
        const scrollToId = 'mainNavBar';
        createScrollToElement('div', 'mainNavBar');

        component.linkScrollTo = true;
        component.linkScrollToId = scrollToId;
        fixture.detectChanges();
        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(document.getElementById(component.linkScrollToId)?.getAttribute('tabindex')).toBe('0');
    });

    it('checkScrollToIdValue() should NOT add tabindex if element is <a> or <button>', () => {
        const scrollToId = 'mainNavBar';
        createScrollToElement('a', 'mainNavBar');

        component.linkScrollTo = true;
        component.linkScrollToId = scrollToId;
        fixture.detectChanges();
        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(document.getElementById(component.linkScrollToId)?.hasAttribute('tabindex')).toBe(false);
    });

});
