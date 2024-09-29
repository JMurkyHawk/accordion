import { Component, ContentChild, ElementRef, VERSION, ViewChild, ViewEncapsulation, WritableSignal,
    computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { JmhRouteAnimation, buttonDrawerHideShowAnimation, fadeInOutAnimation } from './app-animations';

import { JMurkyHawkDrawerComponent } from './components/j-murky-hawk-drawer/j-murky-hawk-drawer.component';
import { NavigationService } from './services/navigation.service';

export interface XyPosition {
    x: string,
    y: string
}

export interface DrawerButtonInfo {
    borderRadius: string, 
    iconLineHeight: string,
    iconLineSpacing: string, 
    iconLineSpeed: string,
    size: string, 
    xyPosition: XyPosition
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [ 
        JmhRouteAnimation,
        buttonDrawerHideShowAnimation,
        fadeInOutAnimation
     ]
})
export class AppComponent {

    public routeIdNumber: number | undefined = undefined;
    public routeTitle: string | undefined = undefined;
    private skipLinksButtonPosition: number | undefined = undefined;

    public title: string = 'Angular Accordion';
    public githubLabel: string = 'View Code In GitHub';
    public navHeading: string = 'Accordion Component Options';
    public skipLinksText: string = 'Skip Navigation';
    public skipLinksAnchorText: string = 'Main Content Area';

    public activeLinkTitle: string = 'Current page';

    public angularVersion: string = VERSION.full;
    public footerNote: string = `Accordion and demo use Angular version ${this.angularVersion}`;
    public pageTop: string = 'Go to page top';

    public optionLinks = [
        {
            label: 'Display Types',
            link: 'accordion-type'
        },
        {
            label: 'Title Transitions',
            link: 'accordion-title-transition'
        },
        {
            label: 'Title Options',
            link: 'accordion-title-options'
        },
        {
            label: 'Body Options',
            link: 'accordion-body-options'
        },
        {
            label: 'Custom Styling',
            link: 'accordion-custom'
        },
        {
            label: 'Output Info',
            link: 'accordion-output'
        }
    ];

    public navLinkData = [
        {
            label: 'Overview',
            link: 'accordion-overview'
        },
        {
            label: 'Accordion Features',
            dropdown: true,
            subLinks: this.optionLinks
        }
    ];

    public navLinkData2 = [{
        label: 'Overview',
        link: 'accordion-overview'
    },
    ...this.optionLinks
    ];

    private screenBreakpoints: { [key: string] : number } = {
        // 'smallest' will be any screen size less than the lowest value below 
        medium: 480,
        large: 768,
        xlarge: 1200
    };

    private drawerWidthList: { [key: string] : string } = {
        small: '100vw', 
        medium: '75vw', 
        large: '50vw', 
        xlarge: '33vw'
    };

    public drawerSize: WritableSignal<string> = signal<string>('20vw');
    public showSubHeadContentIndicator: WritableSignal<boolean> = signal<boolean>(true);
    public showDesktopNav: WritableSignal<boolean> = signal<boolean>(true);
    public buttonDrawerHideShow: WritableSignal<boolean> = signal<boolean>(false);
    public buttonDrawerPosition: WritableSignal<string> = signal<string>('left');
    public buttonDrawerHideShowAnimate = computed(() => {
        return `${this.buttonDrawerPosition()}_${this.buttonDrawerHideShow()}`;
    });
    public isDrawerButtonPositionInside: WritableSignal<boolean> = signal<boolean>(true);
    public drawerButtonInfo: WritableSignal<DrawerButtonInfo> = signal<DrawerButtonInfo>({ 
        borderRadius: '.5rem', 
        iconLineHeight: '.3rem',
        iconLineSpacing: '.7rem', 
        iconLineSpeed: '.4s',
        size: '3.8rem', 
        xyPosition: { 
            x: '2rem', 
            y: '2rem'
        }
    });

    private windowResizeSubscription$: Subscription;
    private windowScrollSubscription$: Subscription;
    private getClickedNavItemInfoSubscription$?: Subscription;

    @ViewChild('pageHead', {static: false, read: ElementRef}) pageHead!: ElementRef;
    @ViewChild('skipLinks', {static: false}) skipLinks!: ElementRef;
    @ViewChild('mainContent', {static: false}) mainContent!: ElementRef;
    @ViewChild('jmDrawerComp', {read: JMurkyHawkDrawerComponent}) jmDrawerComp!: JMurkyHawkDrawerComponent;
    @ViewChild('jmDrawer', { read: ElementRef }) jmDrawer!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private navigationService: NavigationService
    ) { 
        this.windowResizeSubscription$ =
            fromEvent(window, 'resize')
            .pipe(debounceTime(250))
            .subscribe((event) => {

                this.drawerSize.set( this.getDrawerSize() );
                this.buttonDrawerHideShowAnimate();
                
                this.showDesktopNav.set(
                    !this.isScreenSize(['smallest']) && !this.isScreenSize(['medium']) ? true : false
                );

                if ( this.isScreenSize(['xlarge']) ) {
                    this.windowScrollDrawerButton();
                    this.setDrawerButtonOptionsForWindowSize();
                    this.showSubHeadContentIndicator.set(false);
                }

                if ( this.isScreenSize(['large']) ) {
                    this.windowScrollDrawerButton();
                    this.setDrawerButtonOptionsForWindowSize();
                    this.showSubHeadContentIndicator.set(false);
                }

                if ( this.isScreenSize(['medium']) ) {
                    this.buttonDrawerHideShow.set(true);
                    this.setDrawerButtonOptionsForWindowSize();
                    this.isWindowScrolledPast() ?
                        this.showSubHeadContentIndicator.set(true) :
                        this.showSubHeadContentIndicator.set(false);
                }

                if ( this.isScreenSize(['smallest']) ) {
                    this.buttonDrawerHideShow.set(true);
                    this.setDrawerButtonOptionsForWindowSize();
                    this.isWindowScrolledPast() ?
                        this.showSubHeadContentIndicator.set(true) :
                        this.showSubHeadContentIndicator.set(false);
                }

                this.determineDrawerButtonPosition();
            });

        this.windowScrollSubscription$ =
            fromEvent(window, 'scroll')
            .pipe(debounceTime(250))
            .subscribe((event) => {
                /* Hide/show the drawer toggle button on screen scroll position 
                    (Hide on larger screens when top header is visible) */
                if ( this.isScreenSize(['large', 'xlarge']) ) {
                    this.windowScrollDrawerButton();
                } else {
                    this.buttonDrawerHideShow.set(true);
                }

                // Hide/show scroll to main content indicator arrow in the subHeaderBar section
                if ( this.isScreenSize(['smallest', 'medium']) && this.isWindowScrolledPast() ) {
                    this.showSubHeadContentIndicator.set(true) 
                } else {
                    this.showSubHeadContentIndicator.set(false);
                }
            });
    }
    
    ngOnInit() {
        this.drawerSize.set(this.getDrawerSize());
        this.showDesktopNav.set(this.showTopNav());

        this.setDrawerButtonOptionsForWindowSize();

        this.isScreenSize(['large', 'xlarge']) ?
            this.showSubHeadContentIndicator.set(false) : 
            this.showSubHeadContentIndicator.set(true);
    }

    ngAfterViewInit() {
        this.skipLinksButtonPosition = this.skipLinksButtonCalc();

        this.getClickedNavItemInfoSubscription$ = this.navigationService.clickedItemInfo$.subscribe(value => {
            if (this.jmDrawer.nativeElement.contains(document.getElementById(value.clickedId)) && !value.isActive) {
                this.jmDrawerComp.drawerButtonClick();
            }
        });

        if ( this.isScreenSize(['large', 'xlarge']) ) {
            this.windowScrollDrawerButton();
        } else {
            this.buttonDrawerHideShow.set(true);
        }

        this.determineDrawerButtonPosition();
    }

    getScreenSize() {
        /* Using this method to get the screen size name from one of the name/size values provided in this.screenBreakpoints.
        Since this isn't componentized, it should be fine to just keep the screenBreakpoints object manually sorted 
        from smallest to largest. If that changes, then sorting should be added to this method. */
        let screenSizeValue: string = 'large';
        let index = 0;
        const screenSize = window.innerWidth;
        const breakPoints = this.screenBreakpoints;
        const bpValues = Object.values(breakPoints);
        const bpKeys = Object.keys(breakPoints);

        for ( const [key, value] of Object.entries(breakPoints) ) {

            // If screen size is less than the smallest (first) size provided in screenBreakpoints object, set 'smallest'
            if ( screenSize < bpValues[0]) {
                screenSizeValue = 'smallest';
                break;
            }

            // If screen size is or falls between a value (A) and the next value (B) in screenBreakpoints object, set value (A)
            if ( screenSize >= bpValues[index] && screenSize < bpValues[index + 1] ) {
                screenSizeValue = bpKeys[index];
                break;
            }

            // If screen size is greater than the largest (last) size provided in screenBreakpoints object, set that size
            if ( screenSize > bpValues[bpValues.length - 1] ) {
                screenSizeValue = bpKeys[bpValues.length - 1];
                break;
            }

            index++;
        }

        return screenSizeValue;
    }

    isScreenSize(data: Array<string> ) {
        // Is the screen size equal to one of the values provided in the data[] array? Returns true or false
        let checkMyData: boolean = false;

        data.forEach((item) => {
            if ( this.getScreenSize() === item ) {
                checkMyData = true;
            }
        });

        return checkMyData;
    }

    getDrawerSize() {
        if ( this.isScreenSize(['smallest']) ) {
            return this.drawerWidthList.small;
        }
        if ( this.isScreenSize(['medium']) ) {
            return this.drawerWidthList.medium;
        }
        if ( this.isScreenSize(['large']) ) {
            return this.drawerWidthList.large;
        }
        if ( this.isScreenSize(['xlarge']) ) {
            return this.drawerWidthList.xlarge;
        }
        return this.drawerWidthList.small;
    }

    drawerButtonOptions(data: any) {
        this.drawerButtonInfo.update((values: any) => {
            let newDrawerButtonInfoObj = {...values};
            for ( const [key, value] of Object.entries(data)) {
                newDrawerButtonInfoObj[key] = value;
            };
            
            return newDrawerButtonInfoObj;
        });
    }

    setDrawerButtonOptionsForWindowSize() {
        if ( this.isScreenSize(['smallest']) ) {
            this.drawerButtonOptions({
                size: '3.2rem', 
                iconLineHeight: '.25rem',
                iconLineSpacing: '.6rem', 
                xyPosition: { 
                    x: '.4rem', 
                    y: '1.8rem' 
                }
            });
        }

        if ( this.isScreenSize(['medium']) ) {
            this.drawerButtonOptions({
                size: '3.6rem', 
                iconLineHeight: '.25rem',
                iconLineSpacing: '.6rem', 
                xyPosition: { 
                    x: '.6rem', 
                    y: '1.6rem' 
                }
            });
        }

        if ( this.isScreenSize(['large']) ) {
            this.drawerButtonOptions({
                size: '4rem', 
                iconLineHeight: '.3rem',
                iconLineSpacing: '.7rem', 
                xyPosition: { 
                    x: '1.2rem', 
                    y: '1.2rem' 
                }
            });
        }

        if ( this.isScreenSize(['xlarge']) ) {
            this.drawerButtonOptions({
                size: '4rem', 
                iconLineHeight: '.3rem',
                iconLineSpacing: '.7rem', 
                xyPosition: { 
                    x: '1.6rem', 
                    y: '1.2rem' 
                }
            });
        }
    }

    isWindowScrolledPast(element?: any) {
        // Default check for the bottom position of the #pageHead element, but allow other element's position to be provided
        let item = element ? element : this.pageHead.nativeElement.offsetHeight;
        return window.scrollY < item ? true : false;
    };
    
    windowScrollDrawerButton() {
        let elementToCompare = this.pageHead.nativeElement.getBoundingClientRect();
        let heightToCompare = elementToCompare.bottom - elementToCompare.top;
        
        if ( window.scrollY > heightToCompare ) {
            this.buttonDrawerHideShow.set(true);
        } else {
            this.buttonDrawerHideShow.set(false);
            setTimeout(() => {
                // If drawer is hidden on screen size change, remove the canDocScrollWhenOpen overflow style on doc body
                document.body.style.removeProperty('overflow');
            });
        }
    }

    determineDrawerButtonPosition() {
        // Toggle button inside drawer on smallest screen size range
        if ( this.isScreenSize(['smallest']) ) { 
            this.isDrawerButtonPositionInside.set(true);
        } 
        
        // Toggle button outside drawer on other (not smallest) screen sizes
        if ( !this.isScreenSize(['smallest']) ) {
            this.isDrawerButtonPositionInside.set(false);
        }
    }

    showTopNav() {
        if ( this.isScreenSize(['large', 'xlarge']) ) {
            return true;
        } else {
            return false;
        }
    }

    skipLinksButtonCalc() {
        const button = this.skipLinks.nativeElement.getBoundingClientRect();
        const buttonTop = button.top;
        const buttonShowTop = buttonTop - button.height;
        return buttonShowTop;
    }

    skipLinksClick(event: any) {
        this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.mainContent.nativeElement.focus({preventScroll: true});
    }

    skipLinksFocus(event: any) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    jmRouteAnimationStart(event: any) {
        /* Trying to get the new page (this.mainContent.nativeElement.children[2]) height from ANY of the router events results in an incorrect page height. 
        No idea why, nothing worked. The only place that I've been able to get the correct height is when the route transition animation starts. 
        A slight delay in the JmhRouteAnimation will allow the setMainContentSize() method to get the correct page measurements and animate the mainContent area's height smoothly, preventing the footer 'jumping' on router navigation. 
        I don't like having to use an arbitrary time delay, but it's the only thing that seems to work... */
        this.mainContent.nativeElement.children[2] ? this.setMainContentSize() : undefined;
    }

    jmRouteAnimationDone(event: any) {
        this.mainContent.nativeElement.removeAttribute('style');
    }

    onActivate() {
        this.routeIdNumber = this.route.firstChild!.snapshot.data['routeIdNumber'];
        this.routeTitle = this.route.firstChild!.snapshot.data['pageTitle'];
    }

    setMainContentSize() {
        const mainComponent = this.mainContent.nativeElement;
        const leaveHeight = mainComponent.children[1].offsetHeight;
        const enterHeight = mainComponent.children[2].offsetHeight;

        mainComponent.setAttribute('style', 'height: ' + leaveHeight + 'px');
        setTimeout(() => {
            mainComponent.setAttribute('style', 'height: ' + enterHeight + 'px' );
        });
    }

    goToPageTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.pageHead.nativeElement.querySelector('#skipLinks').focus();
    }
    
    ngOnDestroy() {
        this.windowResizeSubscription$.unsubscribe();
        this.windowScrollSubscription$.unsubscribe();
        this.getClickedNavItemInfoSubscription$?.unsubscribe();
    }

}
