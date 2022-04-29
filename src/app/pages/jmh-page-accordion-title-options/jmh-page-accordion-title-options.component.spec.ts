import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionTitleOptionsComponent } from './jmh-page-accordion-title-options.component';

describe('JmhPageAccordionTitleOptionsComponent', () => {
  let component: JmhPageAccordionTitleOptionsComponent;
  let fixture: ComponentFixture<JmhPageAccordionTitleOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmhPageAccordionTitleOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmhPageAccordionTitleOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
