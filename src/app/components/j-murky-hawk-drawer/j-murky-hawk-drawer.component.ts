import { Component, ElementRef, HostListener, Input, Renderer2, Signal, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { drawerButtonIconAnimation,
    drawerButtonPositionAnimation,
    drawerOpenCloseAnimation,
    drawerPageOverlayAnimation} from './j-murky-hawk-drawer-animations.component';

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
        CommonModule
    ],
    templateUrl: './j-murky-hawk-drawer.component.html',
    styleUrl: './j-murky-hawk-drawer.component.scss',
    animations: [
        drawerButtonIconAnimation,
        drawerButtonPositionAnimation,
        drawerOpenCloseAnimation,
        drawerPageOverlayAnimation
    ]
})

export class JMurkyHawkDrawerComponent {

    @Input() drawerBackground: string = 'rgba(255, 255, 255, .9)';
    @Input() drawerSpeed: string = '.5s';
    @Input() drawerWidth: string = '50vw';
    @Input() drawerButtonInfo = { 
        borderRadius: '.5rem', 
        iconLineHeight: '3px',
        iconLineSpacing: '7px', 
        iconLineSpeed: '.5s',
        size: '5rem', 
        xyPosition: { x: '2rem', y: '2rem' }
    };
    
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

    @ViewChild('jmDrawer') jmDrawer!: ElementRef;
    @ViewChild('jmDrawerButton') jmDrawerButton!: ElementRef;
    @ViewChild('jmDrawerButtonWrapper') jmDrawerButtonWrapper!: ElementRef;
    @ViewChild('jmDrawerOverlay') jmDrawerOverlay!: ElementRef;

    @HostListener('document:keydown.escape', ['$event'])
    onKeyDown(e: any) {
        // Escape key should close the drawer menu
        if ( e.key === 'Escape' && this.drawerShow() ) {
            this.drawerButtonClick();
        }
    }

    public drawerShow: WritableSignal<boolean> = signal<boolean>(false);
    public screenSize: WritableSignal<string> = signal<string>('');
    public drawerButtonXYLeft: WritableSignal<string> = signal<string>('auto');
    public drawerButtonXYRight: WritableSignal<string> = signal<string>('auto');
    public drawerFocusableItems: WritableSignal<any> = signal<any>([]);
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

    private _drawerButtonAlign: string = 'left';
    private _drawerPosition: string = 'left';
    private tagName: string = '';
    public buttonPosition = this.jmDrawerButtonWrapper?.nativeElement.style.cssText;
    
    private windowResizeSubscription$: any;
    private windowFocusSubscription$: any;
    private windowTabSubscription$: any;
    private windowTabShiftSubscription$: any;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.tagName = elementRef.nativeElement.tagName.toLowerCase();

        this.windowFocusSubscription$ = 
            fromEvent(window, 'focus')
            .subscribe(() => {
                if ( this.drawerShow() && this.isFocusOutsideDrawer() ) {
                    this.drawerFocusableItems()[0].focus();
                } 
            });

        this.windowTabShiftSubscription$ = 
            fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(
                filter(e => e.shiftKey),
                filter(e => e.key === 'Tab')
            )
            .subscribe((event) => {
                if ( this.drawerShow() ) {
                    this.jmFocusTrap('Shift Tab', event);
                }
            }); 
            
        this.windowTabSubscription$ = 
            fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(
                filter((e: any) => !e.shiftKey),
                filter((e: any) => e.key === 'Tab')
            )
            .subscribe((event) => {
                if ( this.drawerShow() ) {
                    this.jmFocusTrap('Tab', event);
                }
            })

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

    ngOnInit() {
        this.setDrawerButtonAlign();
        this.setComponentCssVariable('jmDrawerSpeed', this.drawerSpeed);
    }

    ngAfterViewInit() {
        this.createOverlayCutout();
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

    /*---------------------
        Drawer focus trap  
      ---------------------*/
    isFocused(element: any) {
        return document.activeElement === element ? true : false;
    }

    isFocusOutsideDrawer() {
        return !Object.values(this.drawerFocusableItems()).includes(document.activeElement);
    }

    jmDrawerGetFocusableItems() {
        const focusableElements = this.jmDrawer?.nativeElement.querySelectorAll(
            'a, button, input, [tabindex]'
        );

        const focusableElementsArray = Array.from(focusableElements)
            .filter( (el: any) => !el.disabled);

        return focusableElementsArray;
    }
    
    jmFocusTrap(key: string, event: any) {
        const item1: any = this.drawerFocusableItems()[0];
        const itemPreLast: any = this.drawerFocusableItems()[this.drawerFocusableItems().length - 2];
        const itemLast: any = this.drawerFocusableItems()[this.drawerFocusableItems().length - 1];

        const is1Focused = this.isFocused(item1);
        const isPreLastFocused = this.isFocused(itemPreLast);
        const isLastFocused = this.isFocused(itemLast);
        const isLastDisabled = () => itemLast.getAttribute('tabindex') === '-1' || itemLast.getAttribute('disabled') ? true : false;
        const noDefault = () => event.preventDefault();
        
        if ( key === 'Shift Tab' ) {
            if ( this.isFocusOutsideDrawer() ) {
                noDefault();
                isLastDisabled() ? 
                    itemPreLast.focus() : 
                    itemLast.focus();
            } else if (is1Focused) { 
                noDefault();
                isLastDisabled() ? 
                    itemPreLast.focus() : 
                    itemLast.focus();
            } // Since first focusable item is always the drawer's toggle button, which always needs to be enabled, no need to check if it's disabled 
        }

        if ( key === 'Tab' ) {
            if ( this.isFocusOutsideDrawer() ) {
                item1.focus();
            } else if (isLastFocused) { 
                noDefault();
                // Since the first focusable item is always the drawer's toggle button, which always needs to be enabled, no need to check if it's disabled 
                item1.focus();
            } else if (isPreLastFocused) {
                noDefault();
                isLastDisabled() ? 
                    item1.focus() :
                    itemLast.focus();
            }
        }
    }
    /*-------------------------
        END Drawer focus trap  
    ---------------------------*/

    /*-------------------------------------------------------
        Drawer background overlay with toggle button cutout 
    ---------------------------------------------------------*/
    // Overlay with cutout allows background opacity on toggle button, if that's desired
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

    createOverlayCutout() {
        let windowHeight = document.documentElement.offsetHeight;
        let btnSize: any = this.returnUnitlessValue(this.drawerButtonInfo.size);
        let btnBottom: number = this.returnUnitlessValue(this.drawerButtonInfo.size) + this.returnUnitlessValue(this.drawerButtonInfo.xyPosition.y);
        let btnRadius: any = this.returnUnitlessValue(this.drawerButtonInfo.borderRadius);
        let btnTop = this.returnUnitlessValue(this.drawerButtonInfo.xyPosition.y);

        // (btnRadius / 2.75) = closest that bezier curve can get to a perfect cirle
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
    /*-----------------------------------------------------------
        END Drawer background overlay with toggle button cutout 
    -------------------------------------------------------------*/

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
            this.setComponentCssVariable('jmDrawerButtonBorderRadius', `0 ${this.drawerButtonInfo.borderRadius} ${this.drawerButtonInfo.borderRadius} 0 `);
        }

        if (this.drawerShow() && this.drawerPosition === 'right') {
            this.setDrawerButtonLR('auto', this.drawerWidth);
            this.setComponentCssVariable('jmDrawerButtonBorderRadius', `${this.drawerButtonInfo.borderRadius} 0 0 ${this.drawerButtonInfo.borderRadius}`);
        }
        
        if (!this.drawerShow()) {
            this.setComponentCssVariable('jmDrawerButtonBorderRadius', `${this.drawerButtonInfo.borderRadius}`);
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
            this.drawerShow() ? this.drawerFocusableItems.set(this.jmDrawerGetFocusableItems()) : '';
        }, 0);
        this.jmDrawerButton.nativeElement.focus();
    }

    overlayClick(event: Event) {
        this.drawerButtonClick();
    }

    ngOnDestroy() {
        this.windowResizeSubscription$.unsubscribe();
        this.windowTabSubscription$.unsubscribe();
        this.windowTabShiftSubscription$.unsubscribe();
        this.windowFocusSubscription$.unsubscribe();
    }
}
