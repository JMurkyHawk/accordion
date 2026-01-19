import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JMurkyHawkDrawerComponent } from './j-murky-hawk-drawer.component';

describe('JMurkyHawkDrawerComponent', () => {
  let component: JMurkyHawkDrawerComponent;
  let fixture: ComponentFixture<JMurkyHawkDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            BrowserAnimationsModule,
            JMurkyHawkDrawerComponent
        ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JMurkyHawkDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
