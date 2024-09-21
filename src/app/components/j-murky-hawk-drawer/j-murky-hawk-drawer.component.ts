import { Component, ElementRef, HostListener, Input, Renderer2, Signal, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ComponentsModule } from '../components.module';

import { drawerButtonIconAnimation,
    drawerButtonPositionAnimation,
    drawerButtonPositionInsideAnimation,
    drawerOpenCloseAnimation,
    drawerPageOverlayAnimation,
    drawerPageOverlayRightAnimation,
    drawerPageOverlayLeftAnimation} from './j-murky-hawk-drawer-animations.component';

export interface DrawerButtonXY {
    x: string,
    y: string
}

export interface DrawerButtonOptions {
    borderRadius: string, 
    iconLineHeight: string,
    iconLineSpacing: string, 
    iconLineSpeed: string,
    size: string, 
    xyPosition: DrawerButtonXY
}

@Component({
    selector: 'j-murky-hawk-drawer',
    standalone: true,
    imports: [ 
        ComponentsModule,
        CommonModule
    ],
    templateUrl: './j-murky-hawk-drawer.component.html',
    styleUrl: './j-murky-hawk-drawer.component.scss',
    animations: [
        drawerButtonIconAnimation,
        drawerButtonPositionAnimation,
        drawerButtonPositionInsideAnimation,
        drawerOpenCloseAnimation,
        drawerPageOverlayAnimation,
        drawerPageOverlayRightAnimation,
        drawerPageOverlayLeftAnimation
    ]
})

export class JMurkyHawkDrawerComponent {

    @Input() drawerBackground: string = 'rgba(0, 0, 0, .95)';
    @Input() drawerSpeed: string = '5s';
    @Input() drawerWidth: string = '50vw';
    @Input() drawerButtonInfo = { 
        borderRadius: '.5rem', 
        iconLineHeight: '.5rem',
        iconLineSpacing: '.75rem', 
        iconLineSpeed: '.5s',
        size: '5rem', 
        xyPosition: { x: '2rem', y: '2rem' }
    };
    
    @Input() drawerButtonSize = '3.8rem';
    @Input() drawerButtonBorderRadius: string = '.5rem';
    @Input() isDrawerButtonPositionInside: boolean = false;
    @Input() drawerPageOverlayBackground: string = '#000000';
    @Input() drawerPageOverlayOpacity: string = '.75';
    @Input() canDocScrollWhenOpen: boolean = false;

    @Input() 
        public get drawerButtonAlign() {
            return this._drawerButtonAlign;
        }

        public set drawerButtonAlign(value: string) {
            const validValue = this.provideOpts(value, 'drawerButtonAlign', ['right', 'left']);
            if ( validValue === value ) {
                this._drawerButtonAlign = validValue;
            }
        }

    @Input() 
        public get drawerPosition() {
            return this._drawerPosition;
        }

        public set drawerPosition(value: string) {
            const validValue = this.provideOpts(value, 'drawerPosition', ['right', 'left']);
            if ( validValue === value ) {
                this._drawerPosition = validValue;
            }
        }

    @ViewChild('jmDrawerButton') jmDrawerButton!: ElementRef;
    @ViewChild('jmDrawerButtonWrapper') jmDrawerButtonWrapper!: ElementRef;
    @ViewChild('jmDrawerOverlay') jmDrawerOverlay!: ElementRef;

    @HostListener('document:keydown.escape', ['$event'])
    onKeyDown(e: any) {
        // Escape key should close the drawer menu
        if ( e.key === 'Escape') {
            if (this.drawerShow()) {
                this.drawerButtonClick();
            } else {
                return;
            }

        }
    }

    private _drawerButtonAlign: string = 'left';
    private _drawerPosition: string = 'left';

    private windowResizeSubscription$: any;

    public drawerShow = signal<boolean>(false);
    public screenSize = signal<string>('');

    public getDrawerButtonAnimateInfo = computed(() => {
        let drawerButtonPosition: string = '';

        if (this.drawerShow() && !this.isDrawerButtonPositionInside) { 
            drawerButtonPosition = this.drawerPosition; 
        } 

        if (this.drawerShow() && this.isDrawerButtonPositionInside) {
            drawerButtonPosition = this.drawerPosition + '_inside';
        }
        
        return drawerButtonPosition;
    });
    private tagName: string = '';

    public drawerButtonXYLeft = signal<string>('auto');
    public drawerButtonXYRight = signal<string>('auto');
    public buttonPosition = this.jmDrawerButtonWrapper?.nativeElement.style.cssText;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.tagName = elementRef.nativeElement.tagName.toLowerCase();

        this.windowResizeSubscription$ =
            fromEvent(window, 'resize')
            .pipe(debounceTime(250))
            .subscribe((event) => {

                if ( !this.drawerShow() && this.drawerPosition === 'left' ) { 
                    this.setDrawerButtonLR(this.drawerButtonInfo.xyPosition.x, 'auto');
                }

                if ( !this.drawerShow() && this.drawerPosition === 'right' ) { 
                    this.setDrawerButtonLR('auto', this.drawerButtonInfo.xyPosition.x);
                }

                // Re-position drawer button immediately on window resize
                if ( this.drawerShow() && !this.isDrawerButtonPositionInside ) {
                    if ( this.drawerPosition === 'left') {
                        this.setDrawerButtonLR(this.drawerWidth, 'auto');
                    } else if ( this.drawerPosition === 'right' ) {
                        this.setDrawerButtonLR('auto', this.drawerWidth);
                    }
                } 
                
                if ( this.drawerShow() && this.isDrawerButtonPositionInside ) {
                    let calculatedPosition = `calc(${this.drawerWidth} - (${this.drawerButtonInfo.size} + ${this.drawerButtonInfo.xyPosition.x}))`;

                    if ( this.drawerPosition === 'left') {
                        this.setDrawerButtonLR(calculatedPosition, 'auto');
                    } else if ( this.drawerPosition === 'right' ) {
                        this.setDrawerButtonLR('auto', calculatedPosition);
                    }
                }
                
                setTimeout(() => {
                    if ( this.drawerShow() && !this.isDrawerButtonPositionInside ) { 
                        this.jmDrawerOverlay.nativeElement.style.cssText = `${this.createOverlayCutout()}` +
                            `background: ${this.drawerPageOverlayBackground}; ` +
                            `opacity: ${this.drawerPageOverlayOpacity}; ` +
                            `width': ${this.drawerWidth};`;
                    }
                }, 0);
                
            });
    }

    errorMessageProvideOpts(value: string, inputName: string, allowableTypes: Array<string>) {

        const message: string =
            `'${value}' is not a valid input value for ${inputName} on the <${this.tagName}> component. \n` +
            `Valid values for ${inputName} are: ${allowableTypes}`;

        console.error(message);

    }

    provideOpts(value: string, inputName: string, allowableTypes: Array<string>) {

        if ( allowableTypes.includes(value) ) {
            return value;
        } else {
            return this.errorMessageProvideOpts(value, inputName, allowableTypes);
        }

    }

    ngOnInit() {
        this.setDrawerButtonAlign();
        this.setComponentCssVariable('jmDrawerSpeed', this.drawerSpeed);
    }

    createOverlayCutout() {
        let windowHeight = document.documentElement.offsetHeight;
        let overlayWidth: number = 3000;
        let btnSize: any = this.returnUnitlessValue(this.drawerButtonInfo.size);
        let btnBottom: number = this.returnUnitlessValue(this.drawerButtonInfo.size) + this.returnUnitlessValue(this.drawerButtonInfo.xyPosition.y);
        let btnRadius: any = this.returnUnitlessValue(this.drawerButtonInfo.borderRadius);
        let btnTop = this.returnUnitlessValue(this.drawerButtonInfo.xyPosition.y);

        // (btnRadius / 2.75) = closest that bezier curve can get to a perfect quarter cirle
        let curveBottom = `${btnSize - (btnRadius / 2.75)} ${btnBottom} ` +
            `${btnSize} ${btnBottom - (btnRadius / 2.75)} ` +
            `${btnSize} ${btnBottom - btnRadius}`;

        let curveTop = `${btnSize} ${btnTop + (btnRadius / 2.75)} ` +
            `${btnSize - (btnRadius / 2.75)} ${btnTop} ` +
            `${btnSize - btnRadius} ${btnTop}`;

        let pathButtonCutout = `M0 0 H3000 V${windowHeight} H0 ` + 
            `V${btnBottom} H${btnSize - btnRadius} C${curveBottom} ` + 
            `V${btnTop + btnRadius} C${curveTop} H0 z`;

        return `clip-path: path("${pathButtonCutout}");`
    }

    removeLetters(str: string) {
        return Number(str.replace(/[^0-9.,]+/, ''));
    }

    getUnitType(data: string) {
        if ( data.endsWith('rem') ) return 'rem';
        if ( data.endsWith('px') ) return 'px';
        if ( Number(data) ) return 'px';
        return;
    }

    returnUnitlessValue(data: any) {
        let unitsValue = this.getUnitType(data);
        let numericValue = this.removeLetters(data);

        if ( unitsValue === 'rem' ) {
            let fontSize = window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size');
            let fontSizeNumber = this.removeLetters(fontSize);
            return numericValue * fontSizeNumber;
        }

        if ( unitsValue === 'px' ) {
            return numericValue;
        }

        throw Error(`${data} is an invalid input value. Please provide a value in 'rem', 'px', or as a Number.`);
    }

    ngAfterViewInit() {
        this.createOverlayCutout();
    }

    removeDocumentScroll() {
        !this.canDocScrollWhenOpen && this.drawerShow() ? 
            this.renderer.setStyle(document.body, 'overflow', 'hidden') : 
            this.renderer.removeStyle(document.body, 'overflow');
    }

    setDrawerButtonLR(left: string, right: string) {
        this.drawerButtonXYLeft.set(left);
        this.drawerButtonXYRight.set(right);
    }

    setComponentCssVariable(variable: string, value: string) {
        this.elementRef.nativeElement.style.setProperty(`--${variable}`, value);
    }

    setDrawerButtonAlign() {
        setTimeout(() => {
            if ( !this.drawerShow() && this.drawerPosition === 'left' ) {
                    this.setDrawerButtonLR(this.drawerButtonInfo.xyPosition.x, 'auto');
            }

            if ( !this.drawerShow() && this.drawerPosition === 'right' ) {
                    this.setDrawerButtonLR('auto', this.drawerButtonInfo.xyPosition.x);
            }
        }, 0);

        this.drawerButtonMove();
    }

    drawerButtonMove() {
        if (this.drawerShow() && this.drawerPosition === 'left') {
            this.setDrawerButtonLR(this.drawerWidth, 'auto');
            this.setComponentCssVariable('jmDrawerButtonBorderRadius', `0 ${this.drawerButtonBorderRadius} ${this.drawerButtonBorderRadius} 0 `);
        }

        if (this.drawerShow() && this.drawerPosition === 'right') {
            this.setDrawerButtonLR('auto', this.drawerWidth);
            this.setComponentCssVariable('jmDrawerButtonBorderRadius', `${this.drawerButtonBorderRadius} 0 0 ${this.drawerButtonBorderRadius}`);
        }
        
        if (!this.drawerShow()) {
            this.setComponentCssVariable('jmDrawerButtonBorderRadius', `${this.drawerButtonBorderRadius}`);
        }
    }

    drawerButtonClick() {
        this.drawerShow.set(!this.drawerShow());
        this.setComponentCssVariable('jmDrawerPageOverlayOpacity', this.drawerPageOverlayOpacity);
        this.removeDocumentScroll();
        setTimeout(() => {
            this.setDrawerButtonAlign();
            if ( this.drawerShow() && !this.isDrawerButtonPositionInside ) { 
                this.jmDrawerOverlay.nativeElement.style.cssText = `${this.createOverlayCutout()}`; 
            }
        }, 0);
    }

    overlayClick(event: Event) {
        this.drawerButtonClick();
    }

    ngOnDestroy() {
        this.windowResizeSubscription$.unsubscribe();
    }
}
