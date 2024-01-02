import { animate, 
    animateChild, 
    group, 
    keyframes, 
    state, 
    stagger, 
    style, 
    transition, 
    trigger, 
    query } from '@angular/animations';

const animationTiming1 = '500ms';

const left = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%'
        })
    ], { optional: true }),
    
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            style({ left: '0%', position: 'absolute' }), 
            animate(`${animationTiming1} ease`, keyframes([
                style({ offset: 0 }),
                style({ offset: .33 }),
                style({ left: '100%', offset: 1 })
            ]))
        ], { optional: true }),
        query(':enter', [
            style({ left: '100%', position: 'absolute' }), 
            animate(`${animationTiming1} ease`, keyframes([
                style({ left: '-100%', offset: 0 }),
                style({ left: '-100%', offset: .33 }),
                style({ left: '0%', offset: 1 })
            ]))
        ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true })
    
];

const right = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%'
        })
    ], { optional: true }),
    
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            style({ left: '0%', position: 'absolute' }), 
            animate(`${animationTiming1} ease`, keyframes([
                style({ offset: 0 }),
                style({ offset: .33 }),
                style({ left: '-100%', offset: 1 })
            ])),
        ], { optional: true }),
        query(':enter', [
            style({ left: '-100%', position: 'absolute' }), 
            animate(`${animationTiming1} ease`, keyframes([
                style({ left: '100%', offset: 0 }),
                style({ left: '100%', offset: .33 }),
                style({ left: '0%', offset: 1 })
            ]))
        ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true })
    
];

export const JmhRouteAnimation =
    trigger('JmhRouteAnimation', [
        transition(':increment', right),
        transition(':decrement', left),
    ]);
