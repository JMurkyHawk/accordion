import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { jmAccordionIconAnimation,
        jmAccordionIconAnimation2,
        jmAccordionTitleAnimation,
        jmAccordionTitleSlotAnimation, 
        jmAccordionBodyAnimation } from "./j-murky-hawk-accordion-animations";

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
    @Input() titleTextOpen: string = ''; // Setting this value overrides titleText for expanded state heading text
    @Input() titleTextClosed: string = ''; // Setting this value overrides titleText for collapsed state heading text
    @Input() titleTextSlot: string = '';
    @Input() titleTextSlotChange: string = '';
    @Input() titleTextSlotOpen: string = '';
    @Input() titleTextSlotClose: string = '';
    @Input() defaultOpen: boolean = false;
    @Input() customHeight: string = '';

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
            this._accordionType = this.provideOpts(value, 'accordionType', ['panel', 'minimal', 'basic']);
        }

    @Input() 
        // Align clickable header button text
        public get titleAlign() {
            return this._titleAlign;
        }
        public set titleAlign(value: string) {
            this._titleAlign = this.provideOpts(value, 'titleAlign', ['left', 'center', 'right']);
        }

    @Input()
        // Align clickable header button icon
        public get iconAlign() {
            return this._iconAlign;
        }
        public set iconAlign(value: string) {
            this._iconAlign = this.provideOpts(value, 'iconAlign', ['left', 'right']);
        }

    @Input() 
        // Change clickable header button icon svg images
        public get iconType() {
            return this._iconType;
        }
        public set iconType(value: string) {
            this._iconType = this.provideOpts(value, 'iconType', ['chevron', 'plusMinus']);
        }

    @Input() 
        // Change clickable header html tag type
        public get titleTagType() {
            return this._titleTagType;
        }

        public set titleTagType(value: string) {
            this._titleTagType = this.provideOpts(value, 'titleTagType', this.headingTagTypes);
        }

    @ViewChild('componentWrapper', {static: false}) componentWrapper!: ElementRef;
    @ViewChild('jmAccordionComponentButton', {static: false}) jmAccordionComponentButton!: ElementRef;
    @ViewChild('titleOpen', {static: false}) titleOpen!: ElementRef;
    @ViewChild('titleClose', {static: false}) titleClose!: ElementRef;
    @ViewChild('titleSlotOpen', {static: false}) titleSlotOpen!: ElementRef;
    @ViewChild('titleSlotClose', {static: false}) titleSlotClose!: ElementRef;
    @ViewChild('jmAccordionContent', {static: false}) jmAccordionContent!: ElementRef;
    
    public jmAccordionOpen: boolean = false;
    // Provide default accordion options
    private _accordionType: any = 'minimal';
    private _titleAlign: any = 'left';
    private _iconAlign: any = 'right';
    private _iconType: any = 'chevron';
    private _titleTagType: any = 'strong';
    // For transitioning the width of changeable text when partial title text change is enabled
    public slotWidth!: number;
    private slotOpenWidth!: number;
    private slotCloseWidth!: number;
    
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

    // Set an allowed list of accordion header transition options
    public titleTextTransitionOptions: { [key: string]: boolean } = {
        useDefaultTitleText: false,
        useTransitionTitleTextOpen: false,
        useTransitionTitleTextClose: false,
        useTransitionTitleTextPartial: false,
        useTransitionTitleTextPartialOpen: false,
        useTransitionTitleTextPartialClose: false
    }

    constructor() {}


/*  -------------------------
      Getter/Setter Methods  
    ------------------------- */

    errorMsgProvideOpts(value: string, inputName: string, allowableTypes: Array<string>) {

        console.error(
            `'${value}' is not a valid input value for ${inputName} on <jm-accordion> component. ` +
            `Valid values for ${inputName}: ${allowableTypes}`
        );

    }

    provideOpts(value: string, inputName: string, allowableTypes: Array<string>) {

        if ( allowableTypes.includes(value) ) {
            return value;
        } else {
            return this.errorMsgProvideOpts(value, inputName, allowableTypes);
        }

    }

    errorMsgCustomStylingObj(property: string, capSetElementStr: string, keyList: Array<string>) {
        
        let message: string = 
            `'${property}' is not a property available to customize on ` +
            `<jm-accordion> component via customStyles${capSetElementStr} input. ` +
            `Valid key values for customStyles${capSetElementStr}: ${keyList}`;

        console.error(message);

    }

    getCustomStylingObj(evalObj: { [key: string] : string }, setElement: string) {
        /* To make setting multiple custom styles for component title and body more concise, options 
            can be set as a group via customStylesTitle and customStylesBody. Allowable properties that 
            can be used are set from the stylesTitleProps and stylesBodyProps arrays.
        */

        for ( const property in evalObj ) {

            let keyList: Array<string>;
            let capSetElementStr: string = setElement.charAt(0).toUpperCase() + setElement.slice(1);

            if ( setElement === 'title' ) {

                keyList = this.stylesTitleProps;

                if ( keyList.includes(property) ) {
                    this.stylesTitle[property] = evalObj[property];
                } else {
                    this.errorMsgCustomStylingObj(property, capSetElementStr, keyList);
                }

            } else if ( setElement === 'body' ) {

                keyList = this.stylesBodyProps;

                if ( keyList.includes(property) ) {
                   this.stylesBody[property] = evalObj[property];
                } else {
                    this.errorMsgCustomStylingObj(property, capSetElementStr, keyList);
                }

            }

        }

    }
    
/*  -----------------------------
      End Getter/Setter Methods  
    ----------------------------- */


    ngOnInit() {

        this.setCustomStyling();

        this.updateAccordionTitle();

        this.checkTitleTextTransitionData();

        this.titleSlotAdjust();

        this.checkDefaultOpen();

    }

    setCustomStyling() {
        
        setTimeout(() => {

            let styleComponent = this.componentWrapper.nativeElement.style; 

            if ( this.stylesTitle ) {
                // Set custom style options for the accordion button heading

                for ( const [key, value] of Object.entries(this.stylesTitle) ) {

                    if ( value ) {
                        styleComponent.setProperty(
                            '--jm-acc-head-' + key, value, 'important'
                        );
                    
                    }
                    
                }

            }

            if ( this.stylesBody && this.jmAccordionContent ) {
                // Set custom style options for the accordion body content

                for ( const [key, value] of Object.entries(this.stylesBody) ) {
                    
                    if ( value !== undefined ) {
                        styleComponent.setProperty(
                            '--jm-acc-' + key, value, 'important'
                        );
                    }
                    
                }

            }
           
        }, 0);
        
    }

    calculateSlotWidth(slotOpenClose: string) {
            
        let slot: number = 0;
        let slotElement: any;

        if ( slotOpenClose === 'close' ) {
            slot = this.slotCloseWidth;
            slotElement = this.titleSlotClose.nativeElement;
        } else {
            slot = this.slotOpenWidth;
            slotElement = this.titleSlotOpen.nativeElement;
        }

        let slotOpenBox = slotElement.getBoundingClientRect();
        let slotOpenBoxRight = Math.ceil(slotOpenBox.right);
        let slotOpenBoxLeft = Math.ceil(slotOpenBox.left);
        this.slotWidth = slotOpenBoxRight - slotOpenBoxLeft + 1;
        
        slot = this.slotWidth;
    }
    
    titleSlotAdjust() {
        
        // TODO: Apparently this timeout is necessary to get, set, and animate the slot text width. 
        // See if there's some way to get around that to remove this setTimeout
        setTimeout(() => {

            if ( this.titleSlotOpen ) {
                this.calculateSlotWidth('open');
            } else if ( this.titleSlotClose ) {
                this.calculateSlotWidth('close');
            }

        }, 0);

    }

    checkTitleTextTransitionData() {
        // Method info: 
        //    Check to see if title text should animate icon only, full text, or partial text, as well
        //    as check for the accordion opened and closed states for text change.

        // List of true title text options
        let titleTextOptions: string = '';

        // If no custom title bar options are provided, use default or provided value of titleText
        let titleTextNoVariables = 
            !this.titleTextOpen && 
            !this.titleTextClosed &&
            !this.titleTextSlot &&
            !this.titleTextSlotOpen &&
            !this.titleTextSlotClose;

        // If Full Title Text transition is open
        let titleTextTransitionOpenCheck =
            this.titleTextOpen &&
            !this.titleTextClosed &&
            !this.titleTextSlot;

        // If Full Title Text transition is closed
        let titleTextTransitionCloseCheck = 
            !this.titleTextOpen &&
            this.titleTextClosed &&
            !this.titleTextSlot;

        // If Partial Title Text transition is enabled
        let titleTextTransitionPartialCheck =
            !this.titleTextOpen &&
            !this.titleTextClosed &&
            this.titleTextSlot;

        // If Partial Title Text transition is open
        let titleTextTransitionPartialOpenCheck =
            !this.titleTextOpen &&
            !this.titleTextClosed &&
            this.titleTextSlot &&
            this.titleTextSlotOpen &&
            !this.titleTextSlotClose;

        // If Partial Title Text transition is closed
        let titleTextTransitionPartialCloseCheck =
            !this.titleTextOpen &&
            !this.titleTextClosed &&
            this.titleTextSlot &&
            !this.titleTextSlotOpen &&
            this.titleTextSlotClose;

        if ( titleTextNoVariables ) {

            titleTextOptions = 'useDefaultTitleText';

        } else if ( titleTextTransitionOpenCheck ) {

            titleTextOptions = 'useTransitionTitleTextOpen';

        } else if ( titleTextTransitionCloseCheck ) {

            titleTextOptions = '';

        } else if ( titleTextTransitionPartialCheck ) {

            titleTextOptions = 'useTransitionTitleTextClose';

        } else if ( titleTextTransitionPartialOpenCheck ) {
            
            titleTextOptions = 'useTransitionTitleTextClose', 'useTransitionTitleTextPartialOpen';

        } else if ( titleTextTransitionPartialCloseCheck ) {
            
            titleTextOptions = 'useDefaultTitleText', 'useTransitionTitleTextClose', 'useTransitionTitleTextPartialClose';
            
        }

        this.setTitleTextTransitionOptions([titleTextOptions]);

    }

    setTitleTextTransitionOptions = ( options: string[] ) => {
        // Method info: 
        //    Iterate through titleTextTransitionOptions[] object and use display options provided via options array
   
        // Loop through options array provided as parameter to this method
        for ( const property of options ) {

            // Loop through the this.titleTextTransitionOptions object. If value matches the value provided via
            // options (as 'property' above), set that property value to true. Otherwise, set to false.
            for ( const objProperty of Object.keys(this.titleTextTransitionOptions) ) {
                
                if ( property === objProperty) {
                    this.titleTextTransitionOptions[objProperty] = true;
                } else {
                    this.titleTextTransitionOptions[objProperty] = false;
                }

            }

        }

    }

    updateAccordionTitle() {

        // If accordion title text for open state is provided, replace titleText with that
        if ( this.jmAccordionOpen && this.titleTextOpen ) {
            this.titleText = this.titleTextOpen;
        }

        // If accordion title text for closed state is provided, replace titleText with that
         if ( !this.jmAccordionOpen && this.titleTextClosed) {
            this.titleText = this.titleTextClosed;
        }

        // If accordion title text for partial title text open state transition is proviced, replace titleText with that
        if ( this.jmAccordionOpen && this.titleTextSlotOpen ) {
            this.titleText = this.titleTextSlot;
            this.titleTextSlotChange = this.titleTextSlotClose;
        }

        // If accordion title text for partial title text close state transition is proviced, replace titleText with that
        if ( !this.jmAccordionOpen && this.titleTextSlotClose ) {
            this.titleText = this.titleTextSlot;
            this.titleTextSlotChange = this.titleTextSlotOpen;
        }

    }

    jmAccordionHeaderActivated() {

        this.toggle();

        setTimeout( () => {

            this.setCustomStyling();

            // If a custom height is set via this.customHeight and the accordion body content is
            // rendered, add style class to allow the accordion body content to scroll
            if ( this.customHeight && this.jmAccordionContent ) {
                this.jmAccordionContent.nativeElement.classList.add('addScroll');
            }
        }, 0);

    }

    checkDefaultOpen() {
        // Method info: 
        //    defaultOpen is used to set the default display state of the accordion component's content.
        //    If this.defaultOpen is set to true, the accordion will be expanded when the component is initally rendered
        //    on the page. checkDefaultOpen() checks this variable's value and sets the component state accoringly.


        if (this.defaultOpen) {
            this.jmAccordionOpen = true;
        } else {
            this.jmAccordionOpen = false;
        }

    }

    toggle() {

        this.jmAccordionOpen = !this.jmAccordionOpen;

        this.updateAccordionTitle();

        this.titleSlotAdjust();

    }

}