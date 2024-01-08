import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { jmAccordionIconAnimation,
        jmAccordionIconAnimation2,
        jmAccordionTitleAnimation,
        jmAccordionTitleSlotAnimation, 
        jmAccordionBodyAnimation } from "./j-murky-hawk-accordion-animations";

export interface AccordionData {
    id: string;
    open: boolean;
}

@Component({
    selector: 'j-murky-hawk-accordion',
    templateUrl: './j-murky-hawk-accordion.component.html',
    styleUrls: ['./j-murky-hawk-accordion.component.scss'],
    animations: [
        jmAccordionIconAnimation,
        jmAccordionIconAnimation2,
        jmAccordionTitleAnimation,
        jmAccordionTitleSlotAnimation, 
        jmAccordionBodyAnimation
    ],
})

export class JMurkyHawkAccordionComponent implements OnInit {

    @Input() jmFieldId: string = '';
    @Input() titleText: string = 'Hide/Show Content';
    @Input() titleTextOpen: string = ''; 
    @Input() titleTextClosed: string = ''; 
    @Input() isOpenByDefault: boolean = false;
    @Input() customHeight: string = '';
    @Input() emitInfo: boolean = false;

    @Input() 
        // Provide custom accordion styling for title as object. See getCustomStylingObj() for more info
        public get customStylesTitle() {
            return this.stylesTitle;
        }

        public set customStylesTitle(values: {[key: string] : string}) {
            this.getCustomStylingObj(values, 'title');
        }
    
    @Input() 
        // Provide custom accordion styling for body as object. See getCustomStylingObj() for more info
        public get customStylesBody() {
            return this.stylesBody;
        }

        public set customStylesBody(values: {[key: string] : string}) {
            this.getCustomStylingObj(values, 'body');
        }

    @Input() 
        // Set accordion type: panel (box style), minimal (underline style), or basic (text/icon only)
        public get accordionType() {
            return this._accordionType;
        }

        public set accordionType(value: string) {
            let validValue = this.provideOpts(value, 'accordionType', ['panel', 'minimal', 'basic']);
            if ( validValue === value ) {
                this._accordionType = validValue;
            }
        }

    @Input()
        public get titleTransition() {
            return this._titleTransition;
        }

        public set titleTransition(value: string) {
            let validValue = this.provideOpts(value, 'titleTransition', ['none', 'full', 'partial']);
            if ( validValue === value ) {
                this._titleTransition = validValue;
            }
        }

    @Input() 
        // Align clickable header button text
        public get titleAlign() {
            return this._titleAlign;
        }

        public set titleAlign(value: string) {
            let validValue = this.provideOpts(value, 'titleAlign', ['left', 'center', 'right']);
            if ( validValue === value ) {
                this._titleAlign = validValue;
            }
        }

    @Input()
        // Align clickable header button icon
        public get iconAlign() {
            return this._iconAlign;
        }

        public set iconAlign(value: string) {
            let validValue = this.provideOpts(value, 'iconAlign', ['left', 'right']);
            if ( validValue === value ) {
                this._iconAlign = validValue;
            }
        }

    @Input() 
        // Change clickable header button icon svg images
        public get iconType() {
            return this._iconType;
        }

        public set iconType(value: string) {
            let validValue = this.provideOpts(value, 'iconType', ['chevron', 'plusMinus']);
            if ( validValue === value ) {
                this._iconType = validValue;
            }
        }

    @Input() 
        // Change clickable header html tag type
        public get titleTagType() {
            return this._titleTagType;
        }

        public set titleTagType(value: string) {
            let validValue = this.provideOpts(value, 'titleTagType', this.headingTagTypes);
            if ( validValue === value ) {
                this._titleTagType = validValue;
            }
        }

    @Output() clickHeader: EventEmitter<AccordionData> = new EventEmitter<AccordionData>(); 

    @ViewChild('titleSlotOpen', {static: false}) titleSlotOpen!: ElementRef;
    @ViewChild('titleSlotClose', {static: false}) titleSlotClose!: ElementRef;
    
    // Provide default accordion options
    public isAccordionOpen: boolean = false;
    public isScrollable: boolean = false;
    public customStyles: string = '';
    private _accordionType: any = 'minimal';
    private _titleTransition: any = 'none';
    private _titleAlign: any = 'left';
    private _iconAlign: any = 'right';
    private _iconType: any = 'chevron';
    private _titleTagType: any = 'strong';
    // For transitioning the width of changeable text when partial title text change is enabled
    public slotWidth: number = NaN;
    public titleTextSlotChange: string = '';
    
    // Allowable values for inputs with options lists
    private stylesTitle: { [key: string]: string } = {};
    private stylesTitleProps: Array<string> = [
        'background', 'background-ro', 'border', 'border-ro', 'color', 'color-ro'
    ];
    private stylesBody: { [key: string]: string } = {};
    private stylesBodyProps: Array<string> = [
        'background', 'border', 'color'
    ];

    public headingTagTypes: Array<string> = [
        'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ];

    constructor() {}


/*  -------------------------
      Getter/Setter Methods  
    ------------------------- */

    errorMessageProvideOpts(value: string, inputName: string, allowableTypes: Array<string>) {

        let message: string =
            `'${value}' is not a valid input value for ${inputName} on the <jm-accordion> component. \n` +
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

    errorMessageCustomStylingObj(property: string, capSetElementStr: string, keyList: Array<string>) {
        
        let message: string = 
            `'${property}' is not a property available to customize on the ` +
            `<jm-accordion> component via customStyles${capSetElementStr} input. \n` +
            `Valid key values for customStyles${capSetElementStr}: ${keyList}`;

        console.error(message);

    }

    getCustomStylingObj(evalObj: { [key: string] : string }, setElement: string) {
        // To make setting multiple custom styles for component title and body more concise, options can be set as a group via customStylesTitle and customStylesBody. Allowable properties that can be used are set from the stylesTitleProps and stylesBodyProps arrays.
        
        for ( const key in evalObj ) {

            let keyList: Array<string>;
            let capSetElementStr: string = setElement.charAt(0).toUpperCase() + setElement.slice(1);

            keyList = (setElement === 'title' ? this.stylesTitleProps : this.stylesBodyProps);

            if ( keyList.includes(key) ) {
                if (setElement === 'title') this.stylesTitle[key] = evalObj[key];
                if (setElement === 'body') this.stylesBody[key] = evalObj[key];
            } else {
                this.errorMessageCustomStylingObj(key, capSetElementStr, keyList);
            }

        }

    }
    
/*  -----------------------------
      End Getter/Setter Methods  
    ----------------------------- */


    ngOnInit() {

        this.setCustomStyling();

        this.updateAccordionTitle();

        this.titleSlotAdjust();

        this.checkIsOpenByDefault();

    }

    buildStyleList(styleProp: string, styleValue: string, forBodyOrHead: string) {
        const headStyle: string = '--jm-acc-head-';
        const bodyStyle: string = '--jm-acc-';
        let prefix: string = forBodyOrHead === 'head' ? headStyle : bodyStyle;

        return `${prefix}${styleProp}: ${styleValue} !important; `;
    }

    setCustomStyling() {

        let styleList: string = '';

        if ( this.stylesTitle ) {
            // Set custom style options for the accordion button heading
            for ( const [key, value] of Object.entries(this.stylesTitle) ) {
                if ( value ) {
                    styleList += this.buildStyleList(key, value, 'head');
                }
            }

        }

        if ( this.stylesBody ) {
            // Set custom style options for the accordion body content
            for ( const [key, value] of Object.entries(this.stylesBody) ) {
                if ( value !== undefined ) {
                    styleList += this.buildStyleList(key, value, 'body');
                }
            }

        }

        this.customStyles = styleList;
        
    }

    calculateSlotWidth(slotOpenClose: string) {
        
        let slotElement: any;

        if ( slotOpenClose === 'close' ) {
            slotElement = this.titleSlotClose.nativeElement;
        } else {
            slotElement = this.titleSlotOpen.nativeElement;
        }

        let slotOpenBox = slotElement.getBoundingClientRect();
        let slotOpenBoxRight = Math.ceil(slotOpenBox.right);
        let slotOpenBoxLeft = Math.ceil(slotOpenBox.left);
        
        return slotOpenBoxRight - slotOpenBoxLeft + 1;
        
    }
    
    titleSlotAdjust() {
        
        setTimeout(() => {

            if ( this.titleSlotOpen ) {
                this.slotWidth = this.calculateSlotWidth('open');
            } else if ( this.titleSlotClose ) {
                this.slotWidth = this.calculateSlotWidth('close');
            }

        }, 0);

    }

    updateAccordionTitle() {

        // If accordion title text for opened or closed state is provided, replace titleText with that
        if ( this._titleTransition === 'full' ) {
            this.titleText = this.isAccordionOpen ? this.titleTextClosed : this.titleTextOpen;
        }

        // If accordion partial title text opened or closed state transition is provided, replace partial title with that
        if ( this._titleTransition === 'partial' ) {
            this.titleTextSlotChange = this.isAccordionOpen ? this.titleTextClosed : this.titleTextOpen;
        }

    }

    emitComponentInfo() {
        this.clickHeader.emit({'id': this.jmFieldId, 'open': this.isAccordionOpen});
    }
    
    isScrollableCheck() {
        // If a custom height is set via this.customHeight and the accordion body content is
        // rendered, add style class to allow the accordion body content to scroll
        return this.customHeight && this.isAccordionOpen ? true : false;
    }

    checkIsOpenByDefault() {
        //  isOpenByDefault is used to set the default display state of the accordion component's content. If this.isOpenByDefault is set to true, the accordion will be expanded when the component is initally rendered. checkIsOpenByDefault() checks this variable's value and sets the component state accoringly.

        if (this.isOpenByDefault) {
            this.isAccordionOpen = true;
            this.updateAccordionTitle();
        } else {
            this.isAccordionOpen = false;
            this.updateAccordionTitle();
        }

    }

    jmAccordionToggle() {

        this.isAccordionOpen = !this.isAccordionOpen;

        if ( this.emitInfo ) {
            this.emitComponentInfo();
        }

        this.updateAccordionTitle();

        this.titleSlotAdjust();

        this.setCustomStyling();

        this.isScrollable = this.isScrollableCheck();

    }

}