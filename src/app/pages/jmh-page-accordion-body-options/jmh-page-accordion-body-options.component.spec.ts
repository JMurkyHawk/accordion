import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionBodyOptionsComponent } from './jmh-page-accordion-body-options.component';

describe('JmhPageAccordionBodyOptionsComponent', () => {
  let component: JmhPageAccordionBodyOptionsComponent;
  let fixture: ComponentFixture<JmhPageAccordionBodyOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmhPageAccordionBodyOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmhPageAccordionBodyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
