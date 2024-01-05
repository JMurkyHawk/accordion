import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JMurkyHawkNavigationComponent } from './j-murky-hawk-navigation.component';

describe('JMurkyHawkNavigationComponent', () => {
  let component: JMurkyHawkNavigationComponent;
  let fixture: ComponentFixture<JMurkyHawkNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JMurkyHawkNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JMurkyHawkNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
