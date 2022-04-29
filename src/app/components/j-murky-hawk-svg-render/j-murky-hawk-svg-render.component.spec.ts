import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JMurkyHawkSvgRenderComponent } from './j-murky-hawk-svg-render.component';

describe('JMurkyHawkSvgRenderComponent', () => {
  let component: JMurkyHawkSvgRenderComponent;
  let fixture: ComponentFixture<JMurkyHawkSvgRenderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [ JMurkyHawkSvgRenderComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JMurkyHawkSvgRenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        fixture.destroy();
    });
    
});
