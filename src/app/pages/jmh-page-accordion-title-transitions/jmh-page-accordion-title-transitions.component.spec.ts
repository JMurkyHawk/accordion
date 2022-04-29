import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionTitleTransitionsComponent } from './jmh-page-accordion-title-transitions.component';

describe('JmhPageAccordionTitleTransitionsComponent', () => {
  let component: JmhPageAccordionTitleTransitionsComponent;
  let fixture: ComponentFixture<JmhPageAccordionTitleTransitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmhPageAccordionTitleTransitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmhPageAccordionTitleTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
