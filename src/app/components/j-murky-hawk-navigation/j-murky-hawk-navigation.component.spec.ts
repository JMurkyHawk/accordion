import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router, Routes, RouterLinkActive } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { JMurkyHawkNavigationComponent } from './j-murky-hawk-navigation.component';
import { JmhPageAccordionOverviewComponent } from 'src/app/pages/jmh-page-accordion-overview/jmh-page-accordion-overview.component';

describe('JMurkyHawkNavigationComponent', () => {
    let component: JMurkyHawkNavigationComponent;
    let fixture: ComponentFixture<JMurkyHawkNavigationComponent>;
    let router: Router;
    let debugElement: DebugElement;
    let linkButton: HTMLElement;
    let scrollToId: string = 'mainContent';
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
    const routes: Routes = [
        {path: '', redirectTo: 'accordion-overview', pathMatch: 'full'},
        {path: 'accordion-overview', component: JmhPageAccordionOverviewComponent}
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                JMurkyHawkNavigationComponent
            ],
            imports: [
                RouterLinkActive,
                RouterTestingModule.withRoutes(routes)
            ]
        })
        .compileComponents();
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JMurkyHawkNavigationComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        component.navItems = links;
        component.linkStyle = 'button';
        linkButton = fixture.nativeElement.querySelector('a');
        fixture.detectChanges();
    });

    const createScrollToElement = (element: string, scrollToId: string) => {
        const checkElement = document.getElementById(scrollToId);
        
        if (checkElement) checkElement.remove();

        document.body
        .appendChild(document.createElement(element))
        .setAttribute('id', scrollToId);
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should go to the accordion overview page when navigating to /accordion-overview', waitForAsync(() => {
        router.navigate(['/accordion-overview']);
        expect(router.navigate).toHaveBeenCalledWith(['/accordion-overview']);
    }));

    it('should render correct number of items according to the number of elements in navItems', () => {
        // Arrange
        fixture.componentRef.setInput('navItems', []);
        fixture.detectChanges();

        // Act
        const listLength = Math.floor(Math.random() * 10);
        for (let i = 0; i < listLength; i++) {
            const randomName = `Label ${Math.floor(Math.random() * 10)}`;
            const randomLink = `/${Math.floor(Math.random() * 10)}`;
            component.navItems.push({'label': randomName, 'link': randomLink});
        }
        fixture.detectChanges();

        // Assert
        const itemEls = fixture.debugElement.queryAll(By.css('li > a'));
        expect(itemEls.length).toEqual(listLength);
        itemEls.forEach((itemEl, index) => {
            expect(itemEl.nativeElement.innerText).toEqual(`${component.navItems[index].label}`);
            expect(itemEl.nativeElement.getAttribute('class')).toEqual(component.linkStyle);
            expect(itemEl.nativeElement.getAttribute('href')).toEqual(`${component.navItems[index].link}`);
        })
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
        createScrollToElement('div', scrollToId);
        fixture.componentRef.setInput('linkScrollTo', true);
        fixture.componentRef.setInput('linkScrollToId', scrollToId);
        fixture.componentRef.setInput('linkScrollToIfPastId', null);
        fixture.detectChanges();

        const doc = fixture.nativeElement.ownerDocument;
        const getScrollToElement = doc.getElementById(component.linkScrollToId);
        expect(getScrollToElement).toBeTruthy;
        
        const btn = fixture.debugElement.query(By.css('li:last-child a'));
        expect(btn).toBeTruthy;

        const scrollToSpy = spyOn(getScrollToElement, 'scrollIntoView').and.callThrough();
        btn.triggerEventHandler('click', null);
        tick(component.linkScrollDelay);
        expect(scrollToSpy).toHaveBeenCalled();
    }));

    it('checkScrollToIdValue() should return the PROVIDED id value if element with that id exists in DOM', () => {
        createScrollToElement('div', scrollToId);
        fixture.componentRef.setInput('linkScrollTo', true);
        fixture.componentRef.setInput('linkScrollToId', scrollToId);
        fixture.detectChanges();
        
        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(component.checkScrollToIdValue(component.linkScrollToId)).toBe(scrollToId);
    });

    it('checkScrollToIdValue() should return the DEFAULT id value if element with that id does NOT exist in DOM', () => {
        const defaultIdValue = component.linkScrollToId;
        createScrollToElement('div', scrollToId);
        scrollToId = 'id-not-in-dom'; // scrollToId now different than element just created with createScrollToElement()
        fixture.componentRef.setInput('linkScrollTo', true);
        fixture.componentRef.setInput('linkScrollToId', scrollToId);
        fixture.detectChanges();

        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(component.checkScrollToIdValue(component.linkScrollToId)).toBe(defaultIdValue);
    });

    it('checkScrollToIdValue() should set id element tabindex="0" if element is NOT <a> or <button>', () => {
        createScrollToElement('div', scrollToId);
        fixture.componentRef.setInput('linkScrollTo', true);
        fixture.componentRef.setInput('linkScrollToId', scrollToId);
        fixture.detectChanges();

        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(document.getElementById(component.linkScrollToId)?.getAttribute('tabindex')).toBe('0');
    });

    it('checkScrollToIdValue() should NOT add tabindex if element is <a> or <button>', () => {
        createScrollToElement('a', scrollToId);
        fixture.componentRef.setInput('linkScrollTo', true);
        fixture.componentRef.setInput('linkScrollToId', scrollToId);
        fixture.detectChanges();
        
        expect(document.getElementById(component.linkScrollToId)).toBeTruthy;
        expect(document.getElementById(component.linkScrollToId)?.hasAttribute('tabindex')).toBe(false);
    });

});