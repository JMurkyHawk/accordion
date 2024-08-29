import { animate, 
    group, 
    keyframes, 
    sequence, 
    style, 
    transition, 
    trigger, 
    query } from '@angular/animations';

const delay = 50;
const animationTiming = 500;

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

export const JmhRouteAnimation =
    trigger('JmhRouteAnimation', [
        transition(':increment', right),
        transition(':decrement', left)
    ]);
