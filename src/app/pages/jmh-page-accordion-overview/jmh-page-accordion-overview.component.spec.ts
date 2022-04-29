import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionOverviewComponent } from './jmh-page-accordion-overview.component';

describe('JmhPageAccordionOverviewComponent', () => {
  let component: JmhPageAccordionOverviewComponent;
  let fixture: ComponentFixture<JmhPageAccordionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JmhPageAccordionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JmhPageAccordionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
