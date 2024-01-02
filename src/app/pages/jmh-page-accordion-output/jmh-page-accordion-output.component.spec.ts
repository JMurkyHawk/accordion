import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmhPageAccordionOutputComponent } from './jmh-page-accordion-output.component';

describe('JmhPageAccordionOutputComponent', () => {
  let component: JmhPageAccordionOutputComponent;
  let fixture: ComponentFixture<JmhPageAccordionOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [JmhPageAccordionOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JmhPageAccordionOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
