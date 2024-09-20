import { Component, ContentChild, ElementRef, VERSION, ViewChild, ViewEncapsulation, WritableSignal,
    computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { JmhRouteAnimation, buttonDrawerHideShowAnimation } from './app-animations';

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
        buttonDrawerHideShowAnimation
     ]
})
export class AppComponent {

    public routeIdNumber: number | undefined = undefined;
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

    public screenSize: WritableSignal<string> = signal<string>('20vw');
    private screenSizeList = {
        small: '100vw', 
        medium: '75vw', 
        large: '50vw', 
        xlarge: '33vw'
    };
    public showDesktopNav: WritableSignal<boolean> = signal<boolean>(true);
    public buttonDrawerHideShow: WritableSignal<boolean> = signal<boolean>(false);
    public buttonDrawerPosition: WritableSignal<string> = signal<string>('left');
    public buttonDrawerHideShowAnimate = computed(() => {
        return `${this.buttonDrawerPosition()}_${this.buttonDrawerHideShow()}`;
    });
    public drawerSpeed = '.35s';
    public isDrawerButtonPositionInside: WritableSignal<boolean> = signal<boolean>(true);
    public drawerButtonInfo: WritableSignal<DrawerButtonInfo> = signal<DrawerButtonInfo>({ 
        borderRadius: '.5rem', 
        iconLineHeight: '.5rem',
        iconLineSpacing: '.75rem', 
        iconLineSpeed: '.35s',
        size: '3.8rem', 
        xyPosition: { 
            x: '2rem', 
            y: '2rem'
        }
    });
    
    private windowResizeSubscription$: any;
    private windowScrollSubscription$: any;

    @ViewChild("pageHead", {static: false, read: ElementRef}) pageHead!: ElementRef;
    @ViewChild("skipLinks", {static: false}) skipLinks!: ElementRef;
    @ViewChild("mainContent", {static: false}) mainContent!: ElementRef;
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
                this.screenSize.set( this.getScreenSize() );
                this.buttonDrawerHideShowAnimate();
                
                this.showDesktopNav.set(
                    this.screenSizeList.small !== this.screenSize() && this.screenSizeList.medium !== this.screenSize() ? true : false
                );

                if ( this.screenSize() === this.screenSizeList.xlarge ) {
                    this.windowScrollDrawerButton();
                    this.drawerButtonOptionsWindowSize(this.screenSizeList.xlarge);
                }

                if ( this.screenSize() === this.screenSizeList.large ) {
                    this.windowScrollDrawerButton();
                    this.drawerButtonOptionsWindowSize(this.screenSizeList.large);
                }

                if ( this.screenSize() === this.screenSizeList.medium ) {
                    this.buttonDrawerHideShow.set(true);
                    this.drawerButtonOptionsWindowSize(this.screenSizeList.medium);
                }

                if ( this.screenSize() === this.screenSizeList.small ) {
                    this.buttonDrawerHideShow.set(true);
                    this.drawerButtonOptionsWindowSize(this.screenSizeList.small);
                }

                this.determineDrawerButtonPosition();
            });

        this.windowScrollSubscription$ =
            fromEvent(window, 'scroll')
            .pipe(debounceTime(250))
            .subscribe((event) => {
                if ( this.screenSize() === this.screenSizeList.large || this.screenSize() === this.screenSizeList.xlarge ) {
                    this.windowScrollDrawerButton();
                } else {
                    this.buttonDrawerHideShow.set(true);
                }
            });
    }

    private myString = 'The most basic, bare-bones option. The icon and accordion content animates when ';

    drawerButtonOptions(data: any) {

        this.drawerButtonInfo.update((values: any) => {
            let newDrawerButtonInfoObj = {...values};
            for ( const [key, value] of Object.entries(data)) {
                newDrawerButtonInfoObj[key] = value;
            };
            
            return newDrawerButtonInfoObj;
        });
    }

    drawerButtonOptionsWindowSize(windowSize: string) {
        if (windowSize === this.screenSizeList.small) {
            this.drawerButtonOptions({
                iconLineHeight: '.25rem',
                iconLineSpacing: '.6rem',
                size: '3.2rem', 
                xyPosition: { 
                    x: '.4rem', 
                    y: '1.6rem' 
                }
            });
        }

        if (windowSize === this.screenSizeList.medium) {
            this.drawerButtonOptions({
                iconLineHeight: '.25rem',
                iconLineSpacing: '.6rem',
                size: '3.2rem', 
                xyPosition: { 
                    x: '.8rem', 
                    y: '1.6rem' 
                }
            });
        }

        if (windowSize === this.screenSizeList.large) {
            this.drawerButtonOptions({
                iconLineHeight: '.35rem',
                iconLineSpacing: '.75rem',
                size: '4rem', 
                xyPosition: { 
                    x: '1.2rem', 
                    y: '1.2rem' 
                }
            });
        }

        if (windowSize === this.screenSizeList.xlarge) {
            this.drawerButtonOptions({
                iconLineHeight: '.35rem',
                iconLineSpacing: '.75rem',
                size: '4rem', 
                xyPosition: { 
                    x: '1.6rem', 
                    y: '1.2rem' 
                }
            });
        }
    }
    
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
        if ( this.screenSize() === this.screenSizeList.small ) { 
            this.isDrawerButtonPositionInside.set(true);
        } 
        
        // Toggle button outside drawer on other screen sizes
        if ( this.screenSize() !== this.screenSizeList.small ) {
            this.isDrawerButtonPositionInside.set(false);
        }
    }

    getScreenSize() {
        if (window.innerWidth < 480) {
            return this.screenSizeList.small;
        }
        if (window.innerWidth >= 480 && (window.innerWidth < 768)) {
            return this.screenSizeList.medium;
        }
        if (window.innerWidth >= 768 && (window.innerWidth < 1200)) {
            return this.screenSizeList.large;
        }
        if (window.innerWidth >= 1200) {
            return this.screenSizeList.xlarge;
        }
        return this.screenSizeList.small;
    }

    showTopNav() {
        if (this.screenSizeList.small !== this.screenSize() && this.screenSizeList.medium !== this.screenSize()) {
            return true;
        } else {
            return false;
        }
    }

    // private isClickedNavItemActive?: Subscription;
    public getClickedNavItemInfo$?: Subscription;
    
    ngOnInit() {
        this.screenSize.set(this.getScreenSize());
        this.showDesktopNav.set(this.showTopNav());
        this.drawerButtonOptionsWindowSize(this.getScreenSize());
    }

    ngAfterViewInit() {
        this.skipLinksButtonPosition = this.skipLinksButtonCalc();

        this.getClickedNavItemInfo$ = this.navigationService.clickedItemInfo$.subscribe(value => {
            if (this.jmDrawer.nativeElement.contains(document.getElementById(value.clickedId)) && !value.isActive) {
                this.jmDrawerComp.drawerButtonClick();
            }
        });

        if (this.getScreenSize() === this.screenSizeList.large || this.getScreenSize() === this.screenSizeList.xlarge) {
            this.windowScrollDrawerButton();
        } else {
            this.buttonDrawerHideShow.set(true);
        }

        // this.screenSize.set(this.getScreenSize());
        // console.log(`this.screenSize(): ${this.screenSize()}`);
        this.determineDrawerButtonPosition();
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
        })
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
        // this.isClickedNavItemActive?.unsubscribe();
        this.getClickedNavItemInfo$?.unsubscribe();
        this.windowResizeSubscription$.unsubscribe();
        this.windowScrollSubscription$.unsubscribe();
    }

    public custom_single_acc_title_code: string = 
        "&lt;<span class=\'color1\'>j-murky-hawk-accordion</span> <br />"
        + "    <span class=\'color2\'>jmFieldId</span>=<span class=\'color7\'>\"accordionCustomTitle\"</span> <br />"
        + "    <span class=\'color2\'>titleText</span>=<span class=\'color7\'>\"Sample title text\"</span> <br />"
        + "    <span class=\'color2\'>accordionType</span>=<span class=\'color7\'>\"panel\"</span> <br />"
        + "    [<span class=\'color2\'>customStylesTitle</span>]=<span class='color7'>\"{ <br />"
        + "        'background' : '#cc0031', <br />"
        + "        'background-ro' : '#ffffff', <br />"
        + "        'border' : '3px solid #cc0031', <br />" 
        + "        'border-ro' : '3px solid #cc0031', <br />" 
        + "        'color' : '#ffffff', <br />"
        + "        'color-ro' : '#770031' <br />"
        + "    }\"</span>&gt; <br />"
        + "    &lt;<span class='color1'>p</span>&gt;Sample Accordion Content</span>&lt;/<span class=\'color1'\>p</span>&gt; <br />"
        + "&lt;/<span class='color1'>j-murky-hawk-accordion</span>&gt;";

}
