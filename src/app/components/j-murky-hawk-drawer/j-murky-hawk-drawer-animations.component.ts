import { animate, animateChild, animation, group, keyframes, state, stagger, style, transition, trigger, useAnimation, query } from '@angular/animations';

let defaultDrawerAnimateTime = '.5s';
let defaultDrawerWidth = '50vw';
let drawerOverlayBackground = '#111111';
let drawerOverlayOpacity = '.5';
let hamburgerLineHeight = '.25rem';
let hamburgerLineSpacing = '.6rem';
let xPositionDefault = '.5rem';
let buttonWidthDefault = '3.8rem';

const drawerButtonIcon = [
    // Drawer toggle button inner icon hamburger <=> close animation
    // Button 'opened' state ('x' formation)
    state('menuIconTop', style({
        bottom: '0', height: '{{height}}', transform: 'rotate(45deg)'
    }), { params: { hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    state('menuIconMiddle', style({
        height: '{{height}}', opacity: '0'
    }), { params: { hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    state('menuIconBottom', style({
        top: '0', height: '{{height}}', transform: 'rotate(-45deg)'
    }), { params: { hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),

    state('hamburgerTop', style({
        bottom: '{{hamburgerLineSpacing}}', height: '{{height}}'
    }), { params: { hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    state('hamburgerMiddle', style({
        height: '{{height}}', opacity: '1'
    }), { params: { hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    state('hamburgerBottom', style({
        top: '{{hamburgerLineSpacing}}', height: '{{height}}'
    }), { params: { hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),

    // Drawer closed button state (hamburger) to drawer opened button state (x)
    transition('hamburgerTop => menuIconTop', [
        animate(`{{speed}} linear`, keyframes([
            style({ bottom: '{{hamburgerLineSpacing}}', transform: 'rotate(0deg)', offset: 0 }),
            style({ bottom: '0', transform: 'rotate(0deg)', offset: .33 }),
            style({ bottom: '0', transform: 'rotate(45deg)', offset: 1 })
        ]))
    ], { params: { speed: defaultDrawerAnimateTime, hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    transition('hamburgerMiddle => menuIconMiddle', [
        animate(`{{speed}} linear`, keyframes([
            style({ opacity: '1', offset: 0 }),
            style({ opacity: '0', offset: .33 })
        ]))
    ], { params: { speed: defaultDrawerAnimateTime, hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    transition('hamburgerBottom => menuIconBottom', [
        animate(`{{speed}} linear`, keyframes([
            style({ top: '{{hamburgerLineSpacing}}', transform: 'rotate(0deg)', offset: 0 }),
            style({ top: '0', transform: 'rotate(0deg)', offset: .33 }),
            style({ top: '0', transform: 'rotate(-45deg)', offset: 1 })
        ])),
    ], { params: { speed: defaultDrawerAnimateTime, hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),

    // Drawer opened button state (x) to drawer closed button state (hamburger)
    transition('menuIconTop => hamburgerTop', [
        animate(`{{speed}} linear`, keyframes([
            style({ bottom: '0', transform: 'rotate(45deg)', offset: 0 }),
            style({ bottom: '0', transform: 'rotate(0deg)', offset: .66 }),
            style({ bottom: '{{hamburgerLineSpacing}}', transform: 'rotate(0deg)', offset: 1 })
        ])),
    ], { params: { speed: defaultDrawerAnimateTime, hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    transition('menuIconMiddle => hamburgerMiddle', [
        animate(`{{speed}} linear`, keyframes([
            style({ opacity: '0', offset: 0 }),
            style({ opacity: '0', offset: .66 }),
            style({ opacity: '1', offset: .67})
        ])),
    ], { params: { speed: defaultDrawerAnimateTime, hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }}),
    transition('menuIconBottom => hamburgerBottom', [
        animate(`{{speed}} linear`, keyframes([
            style({ top: '0', transform: 'rotate(-45deg)', offset: 0 }),
            style({ top: '0', transform: 'rotate(0deg)', offset: .66 }),
            style({ top: '{{hamburgerLineSpacing}}', transform: 'rotate(0deg)', offset: 1 })
        ])),
    ], { params: { speed: defaultDrawerAnimateTime, hamburgerLineSpacing: hamburgerLineSpacing, height: hamburgerLineHeight }})
];

const drawerButtonPositionRight = [
    // Drawer right show animation
    transition('* => right', [
        style({ left: 'auto', right: '{{xInit}}' }),
        group([
            animate(`{{speed}} linear`, style({ left: 'auto', right: '{{xOpen}}' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, xInit: xPositionDefault, xOpen: defaultDrawerWidth } }),

    // Drawer right styling when animation is complete
    state('right', style({
        left: 'auto',
        right: '{{xOpen}}'
    }), { params: { speed: defaultDrawerAnimateTime, xInit: xPositionDefault, xOpen: defaultDrawerWidth }}),

    // Drawer right hide animation
    transition('right => *', [
        style({ left: 'auto',  right: '{{xOpen}}' }),
        group([
            animate(`{{speed}} linear`, style({ left: 'auto', right: '{{xInit}}' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, xInit: xPositionDefault, xOpen: defaultDrawerWidth } })
]

const drawerButtonPositionLeft = [
    // Drawer left show animation
    transition('* => left', [
        style({ left: '{{xInit}}', right: 'auto' }),
        group([
            animate(`{{speed}} linear`, style({ left: '{{xOpen}}' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, xInit: xPositionDefault, xOpen: defaultDrawerWidth } }),

    // Drawer left styling when animation is complete
    state('left', style({
        left: '{{xOpen}}',
        right: 'auto'
    }), { params: { speed: defaultDrawerAnimateTime, xInit: xPositionDefault, xOpen: defaultDrawerWidth } }),

    // Drawer left hide animation
    transition('left => *', [
        style({ left: '{{xOpen}}',  right: 'auto' }),
        group([
            animate(`{{speed}} linear`, style({ left: '{{xInit}}' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, xInit: xPositionDefault, xOpen: defaultDrawerWidth } })
];

// const drawerButtonPosition = [
//     ...drawerButtonPositionRight,
//     ...drawerButtonPositionLeft
// ];

const drawerButtonPositionRightInside = [
    // Drawer right show animation
    transition('* => right_inside', [
        style({ left: 'auto', right: 'calc( {{xInit}} )' }),
        group([
            animate(`{{speed}} linear`, style({ right: 'calc( {{xOpen}} - {{width}} - {{xInit}} )' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, width: buttonWidthDefault, xInit: xPositionDefault, xOpen: defaultDrawerWidth } }),

    // Drawer right styling when animation is complete
    state('right_inside', style({
        left: 'auto',
        right: 'calc( {{xOpen}} - {{width}} - {{xInit}} )'
    }), { params: { speed: defaultDrawerAnimateTime, width: buttonWidthDefault, xInit: xPositionDefault, xOpen: defaultDrawerWidth }}),

    // Drawer right hide animation
    transition('right_inside => *', [
        style({ left: 'auto',  right: 'calc( {{xOpen}} - {{width}} - {{xInit}} )' }),
        group([
            animate(`{{speed}} linear`, style({ right: 'calc( {{xInit}} )' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, width: buttonWidthDefault, xInit: xPositionDefault, xOpen: defaultDrawerWidth } })
]

const drawerButtonPositionLeftInside = [
    // Drawer left show animation
    transition('* => left_inside', [
        style({ left: 'calc( {{xInit}} )', right: 'auto' }),
        group([
            animate(`{{speed}} linear`, style({ left: 'calc( {{xOpen}} - {{width}} - {{xInit}} )' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, width: buttonWidthDefault, xInit: xPositionDefault, xOpen: defaultDrawerWidth } }),

    // Drawer left styling when animation is complete
    state('left_inside', style({
        left: 'calc( {{xOpen}} - {{width}} - {{xInit}} )',
        right: 'auto'
    }), { params: { speed: defaultDrawerAnimateTime, width: buttonWidthDefault, xInit: xPositionDefault, xOpen: defaultDrawerWidth } }),

    // Drawer left hide animation
    transition('left_inside => *', [
        style({ left: 'calc( {{xOpen}} - {{width}} - {{xInit}} )',  right: 'auto' }),
        group([
            animate(`{{speed}} linear`, style({ left: 'calc( {{xInit}} )' })),
            query('@drawerButtonIcon', [
                animateChild()
            ])
        ])
    ], { params: { speed: defaultDrawerAnimateTime, width: buttonWidthDefault, xInit: xPositionDefault, xOpen: defaultDrawerWidth } })
];

const drawerButtonPosition = [
    ...drawerButtonPositionRight,
    ...drawerButtonPositionLeft,
    ...drawerButtonPositionRightInside,
    ...drawerButtonPositionLeftInside
];

const drawerButtonPositionInside = [
    ...drawerButtonPositionRightInside,
    ...drawerButtonPositionLeftInside
]

const drawerAnimateLeft = [
    // Drawer left show initial styling
    state('left', style({
        left: '-{{width}}', 
        right: 'auto', 
        width: '{{width}}'
    }), {params: {  width: defaultDrawerWidth, speed: defaultDrawerAnimateTime }}),

    // Drawer left show animation
    transition('void => left', [
        style({ left: '-{{width}}', right: 'auto', width: '{{width}}' }),
        animate(`{{speed}} linear`, style({ left: '0' })),
    ], { params: { width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    // Drawer left hide animation
    transition('left => void', [
        style({ left: '0',  right: 'auto', width: '{{width}}' }),
        animate(`{{speed}} linear`, style({ left: '-{{width}}' }))
    ], { params: { width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    // Drawer left styling when animation is complete
    state('left', style({
        left: '0',
        right: 'auto',
        width: '{{width}}'
    }), { params: { width: defaultDrawerWidth}})
];

const drawerAnimateRight = [
    // Drawer right show initial styling
    state('right', style({ 
        left: 'auto',
        right: '0',
        width: '{{width}}' 
    }), { params: { width: defaultDrawerWidth}}),

    // Drawer right show animation
    transition('void => right',  [
        style({ left: 'auto', right: '-{{width}}', width: '{{width}}' }),
        animate(`{{speed}} linear`, style({ right: '0' })),
    ], { params: { width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    // Drawer right hide animation
    transition('right => void', [
        style({ left: 'auto', right: '0', width: '{{width}}' }),
        animate(`{{speed}} linear`, style({ right: '-{{width}}' }))
    ], { params: { width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    // Drawer right styling when animation is complete
    state('right', style({
        left: 'auto',
        right: '0',
        width: '{{width}}'
    }), { params: { width: defaultDrawerWidth}})
];

const drawerOpenClose = [
    ...drawerAnimateLeft,
    ...drawerAnimateRight
];

const drawerPageOverlayRightAnimate = [
    // Drawer page overlay right show animation
    transition('void => right',  [
        style({ background: 'transparent', left: '0', opacity: '0', right: '0' }),
        animate(`{{speed}} linear`, style({ background: '{{background}}', opacity: '{{opacity}}', right: '{{width}}' })),
    ], { params: { background: drawerOverlayBackground, opacity: drawerOverlayOpacity, width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    // Drawer right hide animation
    transition('right => void', [
        style({ background: '{{background}}', left: '0', opacity:'{{opacity}}', right: '{{width}}' }),
        animate(`{{speed}} linear`, style({ background: 'transparent', opacity: '0', right: '0' }))
    ], { params: { background: drawerOverlayBackground, opacity: drawerOverlayOpacity, width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    state('right', style({ 
        background: '{{background}}', 
        left: '0',
        opacity: '{{opacity}}',
        right: '{{width}}'
    }), { params: { background: drawerOverlayBackground, opacity: drawerOverlayOpacity, width: defaultDrawerWidth }})
];

const drawerPageOverlayLeftAnimate = [
    // Drawer page overlay right show animation
    transition('void => left',  [
        style({ background: 'transparent', left: '0', opacity: '0', right: '0' }),
        animate(`{{speed}} linear`, style({ background: '{{background}}', left: '{{width}}', opacity: '{{opacity}}' })),
    ], { params: { background: drawerOverlayBackground, opacity: drawerOverlayOpacity, width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    // Drawer right hide animation
    transition('left => void', [
        style({ background: '{{background}}', left: '{{width}}', opacity: '{{opacity}}', right: '0' }),
        animate(`{{speed}} linear`, style({ background: 'transparent', left: '0', opacity: '0' }))
    ], { params: { background: drawerOverlayBackground, opacity: drawerOverlayOpacity, width: defaultDrawerWidth, speed: defaultDrawerAnimateTime } }),

    state('left', style({ 
        background: '{{background}}',
        left: '{{width}}',
        opacity: '{{opacity}}',
        right: '0'
    }), { params: { background: drawerOverlayBackground, opacity: drawerOverlayOpacity, width: defaultDrawerWidth }})
];

const drawerPageOverlayAnimate = [
    ...drawerPageOverlayRightAnimate,
    ...drawerPageOverlayLeftAnimate
];

export const drawerButtonIconAnimation = 
    trigger('drawerButtonIcon', drawerButtonIcon);

export const drawerButtonPositionAnimation = 
    trigger('drawerButtonPosition', drawerButtonPosition);

export const drawerButtonPositionInsideAnimation = 
    trigger('drawerButtonPositionInside', drawerButtonPositionInside);

export const drawerOpenCloseAnimation = 
    trigger('drawerOpenClose', drawerOpenClose);

export const drawerPageOverlayAnimation = 
    trigger('drawerPageOverlayAnimate', drawerPageOverlayAnimate);

export const drawerPageOverlayRightAnimation = 
    trigger('drawerPageOverlayRightAnimate', drawerPageOverlayRightAnimate);

export const drawerPageOverlayLeftAnimation = 
    trigger('drawerPageOverlayLeftAnimate', drawerPageOverlayLeftAnimate);
