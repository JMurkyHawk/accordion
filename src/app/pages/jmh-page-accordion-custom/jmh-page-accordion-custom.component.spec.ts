import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionCustomComponent } from './jmh-page-accordion-custom.component';

describe('JmhPageAccordionCustomComponent', () => {
  let component: JmhPageAccordionCustomComponent;
  let fixture: ComponentFixture<JmhPageAccordionCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmhPageAccordionCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmhPageAccordionCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.destroy();
  });
});
