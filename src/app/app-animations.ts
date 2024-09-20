import { animate, animateChild, group, keyframes, sequence, state, style, transition, trigger, query } from '@angular/animations';

const delay = 50;
const animationTiming = 500;
const buttonHideShowTiming = 250;
const buttonXPosition = '1.6rem';
const buttonWidth = '3.2rem';

let hamburgerLineSpacing = '.75rem';
let hamburgerLineHeight = '.25rem';

const left = [
    style({ 
        overflow: 'hidden' 
    }),

    query(':enter, :leave', [
        style({
            position: 'relative',
            top: 0,
            width: '100%'
        })
    ], { optional: true }),
    
    group([

        query(':leave', [
            /* *NOTE: It's necessary to use sequence() so the position: 'absolute' style isn't applied before the custom page height animation (in app.component.ts) has time to get the height of the :enter and :leave pages when their positons are 'relative'. 
            This keeps them in the page height calculation. 
            Applying 'absolue' right away will cause the page height calculation/animation to fail, as well as the appearance of the footer jumping to the top of the main content section until these :enter and :leave animations are complete.
            */
            sequence([ // *See *NOTE above
                style({ left: '0%' }), 
                animate(`${delay}ms ease-in`, keyframes([
                    style({ left: '0%', offset: 0 }),
                    style({ left: '0%', offset: 1 })
                ])),
                style({ position: 'absolute'}),
                animate(`${animationTiming}ms ease-out`, keyframes([
                    style({ left: '0%', offset: 0 }),
                    style({ left: '100%', offset: 1 })
                ]))
            ])
        ], { optional: true }),

        query(':enter', [
            sequence([ // *See *NOTE above
                style({ left: '100%' }), 
                animate(`${delay}ms ease-in`, keyframes([
                    style({ left: '-100%', offset: 0 }),
                    style({ left: '-100%', offset: 1 })
                ])),
                style({ position: 'absolute' }),
                animate(`${animationTiming}ms ease-out`, keyframes([
                    style({ left: '-100%', offset: 0 }),
                    style({ left: '0%', offset: 1 })
                ]))
            ])
        ], { optional: true })
    ])
    
];

const right = [
    style({ 
        overflow: 'hidden' 
    }),

    query(':enter, :leave', [
        style({
            position: 'relative',
            top: 0,
            width: '100%'
        })
    ], { optional: true }),
    
    group([

        query(':leave', [
            sequence([ // *See *NOTE above
                style({ left: '0%' }), 
                animate(`${delay}ms ease-in`, keyframes([
                    style({ left: '0%', offset: 0 }),
                    style({ left: '0%', offset: 1 })
                ])),
                style({ position: 'absolute' }),
                animate(`${animationTiming}ms ease-out`, keyframes([
                    style({ left: '0%', offset: 0 }),
                    style({ left: '-100%', offset: 1 })
                ])),
            ])
        ], { optional: true }),

        query(':enter', [
            sequence([ // *See *NOTE above
                style({ left: '-100%' }), 
                animate(`${delay}ms ease-in`, keyframes([
                    style({ left: '100%', offset: 0 }),
                    style({ left: '100%', offset: 1 }),
                ])),
                style({ position: 'absolute' }),
                animate(`${animationTiming}ms ease-out`, keyframes([
                    style({ left: '100%', offset: 0 }),
                    style({ left: '0%', offset: 1 })
                ]))
            ])
        ], { optional: true })
    ])
    
];

const buttonRight = [
    transition('void => right', [
        query('.jmDrawerButtonWrapper', [
            style({ 
                right: 'calc( -{{buttonWidth}} - {{buttonXPosition}} )', 
                position: 'fixed', 
                left: 'auto'
            }),
            group([
                animate('{{buttonHideShowTiming}} linear', style({
                    right: '{{buttonXPosition}}', 
                    left: 'auto'
                })),
                query('@drawerButtonIcon', [
                    animateChild()
                ])
            ])
        ])
    ], { params: {buttonHideShowTiming: buttonHideShowTiming, buttonWidth: buttonWidth, buttonXPosition: buttonXPosition} }),
    
    transition('right => void', [
        query('.jmDrawerButtonWrapper', [
            style({ 
                right: '{{buttonXPosition}}', 
                position: 'fixed', 
                left: 'auto'
            }),
            group([
                animate('{{buttonHideShowTiming}} linear', style({
                    right: 'calc( -{{buttonWidth}} - {{buttonXPosition}} )', 
                    left: 'auto'
                })),
                query('.menuIconTop', [
                    style({
                        bottom: '{{buttonLineSpacing}}',
                        height: '{{buttonHeight}}'
                    })
                ]),
                query('.menuIconMiddle', [
                    style({
                        height: '{{buttonHeight}}',
                        opacity: '1'
                    })
                ]),
                query('.menuIconBottom', [
                    style({
                        height: '{{buttonHeight}}',
                        top: '{{buttonLineSpacing}}'
                    })
                ])
            ])
        ])
    ], { params: {
            buttonHideShowTiming: buttonHideShowTiming, 
            buttonWidth: buttonWidth, 
            buttonXPosition: buttonXPosition, 
            buttonLineSpacing: hamburgerLineSpacing, 
            buttonHeight: hamburgerLineHeight
        }}
    ),

];

const buttonLeft = [
    transition('void => left', [
        query('.jmDrawerButtonWrapper', [
            style({ 
                left: 'calc( -{{buttonWidth}} - {{buttonXPosition}} )', 
                position: 'fixed', 
                right: 'auto'
            }),
            group([
                animate('{{buttonHideShowTiming}} linear', style({
                    left: '{{buttonXPosition}}', 
                    right: 'auto'
                })),
                query('@drawerButtonIcon', [
                    animateChild()
                ])
            ])
        ])
    ], { params: {buttonHideShowTiming: buttonHideShowTiming, buttonWidth: buttonWidth, buttonXPosition: buttonXPosition} }),
    
    transition('left => void', [
        query('.jmDrawerButtonWrapper', [
            style({ 
                left: '{{buttonXPosition}}', 
                position: 'fixed', 
                right: 'auto'
            }),
            group([
                animate('{{buttonHideShowTiming}} linear', style({
                    left: 'calc( -{{buttonWidth}} - {{buttonXPosition}} )', 
                    right: 'auto'
                })),
                query('.menuIconTop', [
                    style({
                        bottom: '{{buttonLineSpacing}}',
                        height: '{{buttonHeight}}'
                    })
                ]),
                query('.menuIconMiddle', [
                    style({
                        height: '{{buttonHeight}}',
                        opacity: '1'
                    })
                ]),
                query('.menuIconBottom', [
                    style({
                        height: '{{buttonHeight}}',
                        top: '{{buttonLineSpacing}}'
                    })
                ])
            ])
        ])
    ], { params: {
            buttonHideShowTiming: buttonHideShowTiming, 
            buttonWidth: buttonWidth, 
            buttonXPosition: buttonXPosition, 
            buttonLineSpacing: hamburgerLineSpacing, 
            buttonHeight: hamburgerLineHeight
        }}
    )

];

const buttonDrawerHideShow = [
    ...buttonRight,
    ...buttonLeft
]

export const JmhRouteAnimation =
    trigger('JmhRouteAnimation', [
        transition(':increment', right),
        transition(':decrement', left)
    ]);

export const buttonDrawerHideShowAnimation = 
    trigger('buttonDrawerHideShow', buttonDrawerHideShow);
