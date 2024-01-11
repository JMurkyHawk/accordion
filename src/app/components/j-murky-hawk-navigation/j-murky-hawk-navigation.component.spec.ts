import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
        linkButton = fixture.nativeElement.querySelector('a');
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should execute linkClick() method when <a> link is clicked', () => {

        spyOn(component, 'linkClick');
        component.linkType = 'button';
        fixture.detectChanges();
        let btn = fixture.debugElement.query(By.css('a'));
        btn.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.linkClick).toHaveBeenCalled();
    });

});
