import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionTypeComponent } from './jmh-page-accordion-type.component';

describe('JmhPageAccordionTypeComponent', () => {
  let component: JmhPageAccordionTypeComponent;
  let fixture: ComponentFixture<JmhPageAccordionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmhPageAccordionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmhPageAccordionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
