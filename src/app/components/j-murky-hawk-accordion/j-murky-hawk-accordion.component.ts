import { Component, ElementRef, OnInit, input, model, output, viewChild } from '@angular/core';

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
    standalone: false
})

export class JMurkyHawkAccordionComponent implements OnInit {

    readonly jmFieldId = input<string>('');
    readonly isOpenByDefault = input<boolean>(false);
    readonly customHeight = input<string>('');
    readonly emitInfo = input<boolean>(false);
    public titleText = model<string>('Hide/Show Content');
    public titleTextOpen = model<string>(''); 
    public titleTextClosed = model<string>(''); 

    // BEGIN Getter/Setters as Signals
    public customStylesTitle = input<{[key: string]: string}, {[key: string]: string}>({}, {
        transform: (values) => {
            this.getCustomStylingObj(values, 'title');

            return this.stylesTitle;
        }
    });
    
    public customStylesBody = input<{[key: string]: string}, {[key: string]: string}>({}, {
        transform: (values) => {
            this.getCustomStylingObj(values, 'body');

            return this.stylesBody;
        }
    });

    public accordionType = input<string, string>('minimal', {
        transform: (value: string) => {
            const validValue = this.provideOpts(value, 'accordionType', ['panel', 'minimal', 'basic']);

            return validValue === value ? validValue : 'minimal';
        }
    });

    public titleTransition = input<string, string>('none', {
        transform: (value: string) => {
            const validValue = this.provideOpts(value, 'titleTransition', ['none', 'full', 'partial']);
            
            return validValue === value ? validValue : 'none';
        }
    });

    public titleAlign = input<string, string>('left', {
        transform: (value: string) => {
            const validValue = this.provideOpts(value, 'titleAlign', ['left', 'center', 'right']);

            return validValue === value ? validValue : 'left';
        }
    });

    public iconAlign = input<string, string>('right', {
        transform: (value: string) => {
            const validValue = this.provideOpts(value, 'iconAlign', ['left', 'right']);

            return validValue === value ? validValue : 'right';
        }
    });

    public iconType = input<string, string>('chevron', {
        transform: (value: string) => {
            const validValue = this.provideOpts(value, 'iconType', ['chevron', 'plusMinus']);

            return validValue === value ? validValue : 'chevron';
        }
    });

    public titleTagType = input<string, string>('strong', {
        transform: (value: string) => {
            const validValue = this.provideOpts(value, 'titleTagType', this.headingTagTypes);

            return validValue === value ? validValue : 'strong';
        }
    });
    // END Getter/Setters as Signals

    public readonly clickHeader = output<AccordionData>();

    private titleSlotOpen = viewChild<ElementRef>('titleSlotOpen');
    private titleSlotClose = viewChild<ElementRef>('titleSlotClose');
    
    // Provide default accordion options
    public isAccordionOpen: boolean = false;
    public isScrollable: boolean = false;
    public customStyles: string = '';

    // For transitioning the width of changeable text when partial title text change is enabled
    public slotWidth: number | undefined = undefined;
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

    constructor() {
        
    }


/*  -------------------------
      Getter/Setter Methods  
    ------------------------- */

    errorMessageProvideOpts(value: string, inputName: string, allowableTypes: Array<string>) {

        const message: string =
            `'${value}' is not a valid input value for ${inputName} on the <${this.constructor.name}> component. \n` +
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
        
        const message: string = 
            `'${property}' is not a property available to customize on the ` +
            `<${this.constructor.name}> component via customStyles${capSetElementStr} input. \n` +
            `Valid key values for customStyles${capSetElementStr}: ${keyList}`;

        console.error(message);

    }

    getCustomStylingObj(evalObj: { [key: string] : string }, setElement: string) {
        // To make setting multiple custom styles for component title and body more concise, options can be set as a group via customStylesTitle and customStylesBody. 
        // Allowable properties that can be used are set from the stylesTitleProps and stylesBodyProps arrays.
        
        for ( const key in evalObj ) {

            let keyList: Array<string>;
            const capSetElementStr: string = setElement.charAt(0).toUpperCase() + setElement.slice(1);

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
                if ( value ) {
                    styleList += this.buildStyleList(key, value, 'body');
                }
            }

        }

        this.customStyles = styleList;
        
    }

    calculateSlotWidth(slotOpenClose: string) {
        
        let slotElement: any;

        if ( slotOpenClose === 'close' ) {
            slotElement = this.titleSlotClose()?.nativeElement;
        } else {
            slotElement = this.titleSlotOpen()?.nativeElement;
        }

        const slotOpenBox = slotElement.getBoundingClientRect();
        const slotOpenBoxRight = Math.ceil(slotOpenBox.right);
        const slotOpenBoxLeft = Math.ceil(slotOpenBox.left);
        
        return slotOpenBoxRight - slotOpenBoxLeft + 1;
        
    }
    
    titleSlotAdjust() {
        
        setTimeout(() => {

            if ( this.titleSlotOpen() ) {
                this.slotWidth = this.calculateSlotWidth('open');
            } else if ( this.titleSlotClose() ) {
                this.slotWidth = this.calculateSlotWidth('close');
            }

        }, 0);

    }

    updateAccordionTitle() {

        // If accordion title text for opened or closed state is provided, replace titleText with that
        if ( this.titleTransition() === 'full' ) {
            this.titleText.set(this.isAccordionOpen ? this.titleTextClosed() : this.titleTextOpen());
        }

        // If accordion partial title text opened or closed state transition is provided, replace partial title with that
        if ( this.titleTransition() === 'partial' ) {
            this.titleTextSlotChange = this.isAccordionOpen ? this.titleTextClosed() : this.titleTextOpen();
        }

    }

    emitComponentInfo() {
        this.clickHeader.emit({'id': this.jmFieldId(), 'open': this.isAccordionOpen});
    }
    
    isScrollableCheck() {
        // If a custom height is set via this.customHeight and the accordion body content is
        // rendered, add style class to allow the accordion body content to scroll
        return this.customHeight() && this.isAccordionOpen ? true : false;
    }

    checkIsOpenByDefault() {
        //  isOpenByDefault is used to set the default display state of the accordion component's content. If this.isOpenByDefault is set to true, the accordion will be expanded when the component is initally rendered. checkIsOpenByDefault() checks this variable's value and sets the component state accoringly.

        if (this.isOpenByDefault()) {
            this.isAccordionOpen = true;
            this.updateAccordionTitle();
        } else {
            this.isAccordionOpen = false;
            this.updateAccordionTitle();
        }

    }

    jmAccordionToggle() {

        this.isAccordionOpen = !this.isAccordionOpen;

        if ( this.emitInfo() ) {
            this.emitComponentInfo();
        }

        this.updateAccordionTitle();

        this.titleSlotAdjust();

        this.setCustomStyling();

        this.isScrollable = this.isScrollableCheck();

    }

}