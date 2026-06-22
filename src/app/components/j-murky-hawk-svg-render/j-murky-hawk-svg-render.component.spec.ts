import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JMurkyHawkSvgRenderComponent } from './j-murky-hawk-svg-render.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('JMurkyHawkSvgRenderComponent', () => {
  let component: JMurkyHawkSvgRenderComponent;
  let fixture: ComponentFixture<JMurkyHawkSvgRenderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [JMurkyHawkSvgRenderComponent],
    imports: [BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
