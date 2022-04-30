import { animate, keyframes, state, stagger, style, transition, trigger, query } from '@angular/animations';

/* 
    List of animations in this file:
        jmAccordionIconAnimation,
        jmAccordionTitleAnimation,
        jmAccordionTitleSlotAnimation, 
        jmAccordionBodyAnimation
*/

const timing1: string = '200ms';
const timing2: string = '200ms';

export const jmAccordionIconAnimation = 

    trigger(
        'jmAccordionIconAnimation', [
            
            state('open', style({
                display: 'block', 
                overflow: 'hidden', 
                transform: 'rotate(90deg)', 
                transformOrigin: '50% 50%'
            }) ),
            state('close', style({
                opacity: 0
            }) ),

            transition('open => close', [
                style({ 
                    transform: 'rotate(-90deg)', 
                    transformOrigin: '50% 50%', 
                    width: '100%'
                }),
                animate(timing2 + ' ease-in-out', keyframes([
                    style({
                        offset: 0, 
                        opacity: 1,
                        transform: 'rotate(-90deg)', 
                        transformOrigin: '50% 50%', 
                        width: '100%'
                    }),
                    style({
                        offset: .5,
                        opacity: 1,
                        transform: 'rotate(-25deg)', 
                        transformOrigin: '50% 50%', 
                        width: '100%'
                    }),
                    style({
                        offset: 1,
                        opacity: 0,
                        transform: 'rotate(0deg)', 
                        transformOrigin: '50% 50%', 
                        width: '0%'
                    }),
                ]))
            ]),
            transition('close => open', [
                style({ 
                    transform: 'rotate(0deg)', 
                    transformOrigin: '50% 50%',
                    width: '50%'
                }),
                animate(timing2 + ' ease-in-out', keyframes([
                    style({
                        offset: 0, 
                        opacity: 0,
                        transform: 'rotate(0deg)', 
                        transformOrigin: '50% 50%',
                        width: '0%'
                    }),
                    style({
                        offset: .5,
                        opacity: 1,
                        transform: 'rotate(-25deg)', 
                        transformOrigin: '50% 50%',
                        width: '100%'
                    }),
                    style({
                        offset: 1,
                        opacity: 1,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                        width: '100%'
                    }),
                ]))
            ])
            
        ],
    );

export const jmAccordionIconAnimation2 = 

    trigger(
        'jmAccordionIconAnimation2', [
            
            state('open', style({
                transform: 'rotate(0deg)'
            }) ),
            state('close', style({
                transform: 'rotate(180deg)'
            }) ),

            transition('open => close', [
                style({ 
                    transform: 'rotate(0deg)', 
                    transformOrigin: '50% 50%'
                }),
                animate(timing1, style({
                    transform: 'rotate(180deg)', 
                    transformOrigin: '50% 50%'
                }))
            ]),
            transition('close => open', [
                style({ 
                    transform: 'rotate(180deg)', 
                    transformOrigin: '50% 50%'
                }),
                animate(timing1, style({
                    transform: 'rotate(0deg)', 
                    transformOrigin: '50% 50%'
                }))
            ])
            
        ],
    );

export const jmAccordionTitleAnimation = 
    trigger(
        'jmAccordionTitleAnimation', [
            
            state('open2', style({
                position: 'relative'
            }) ),
            state('close2', style({
                position: 'relative'
            }) ),

            transition('void => close2', [
                style({ 
                    transform: 'translateY(100%) rotateX(90deg)', 
                    opacity: 0,
                    position: 'absolute'
                }),
                animate('250ms ease-in-out', keyframes([
                    style({ opacity: 0, offset: 0 }),
                    style({ transform: 'translateY(100%)', offset: .2 }),
                    style({ transform: 'translateY(0%)', opacity: 1, offset:1 })
                ]))
            ]),
            transition('open2 => void', [
                style({ 
                    transform: 'translateY(0%) rotateX(0deg)', 
                    opacity: 1
                }),
                animate(timing1, style({
                    transform: 'translateY(-100%) rotateX(-90deg)', 
                    opacity: 0
                }))
            ]),
            transition('close2 => void', [
                style({ 
                    transform: 'translateY(0%) rotateX(0deg)', 
                    opacity: 1
                }),
                animate(timing1, style({
                    transform: 'translateY(100%) rotateX(90deg)', 
                    opacity: 0
                }))
            ]),
            transition('void => open2', [
                style({ 
                    transform: 'translateY(-100%) rotateX(90deg)', 
                    opacity: 0,
                    position: 'absolute'
                }),
                animate(timing1, style({
                    transform: 'translateY(0%) rotateX(0deg)', 
                    opacity: 1
                }))
            ])
            
        ],
    );

export const jmAccordionTitleSlotAnimation = 
    trigger(
        'jmAccordionTitleAnimationSlot', [
            
            state('open', style({
            }) ),
            state('close', style({
            }) ),

            transition('void => close', [
                style({ 
                    transform: 'translateY(100%) rotateX(90deg)',
                    position: 'absolute'
                }),
                animate(timing1 + ' ease-in-out', 
                    style({ transform: 'translateY(0%) rotateX(0deg)' })
                )
            ]),
            transition('open => void', [
                style({ 
                    transform: 'translateY(0%) rotateX(0deg)', 
                    opacity: 1,
                }),
                animate(timing1, style({
                    transform: 'translateY(-100%) rotateX(-90deg)', 
                    opacity: 0,
                }))
            ]),
            transition('close => void', [
                style({ 
                    transform: 'translateY(0%) rotateX(0deg)', 
                    opacity: 1,
                }),
                animate(timing1, style({
                    transform: 'translateY(100%) rotateX(90deg)', 
                    opacity: 0,
                }))
            ]),
            transition('void => open', [
                style({ 
                    transform: 'translateY(-100%) rotateX(90deg)', 
                    opacity: 0,
                    position: 'absolute'
                }),
                animate(timing1 + ' ease-in-out', 
                    style({ opacity: 1, transform: 'translateY(0%) rotateX(0deg)' })
                )
            ])
            
        ],
    );

export const jmAccordionBodyAnimation = 
    trigger(
        'jmAccordionBodyAnimation', [
            
            transition(':enter', [
                style({
                    height: 0,
                    opacity: 0,
                    paddingTop: 0,
                    paddingBottom: 0
                }),
                animate(timing1, style({
                    height: '*',
                    opacity: 1,
                    paddingTop: '*',
                    paddingBottom: '*'
                }))
            ]),
            
            transition(':leave', [
                style({
                    height: '*',
                    opacity: 1,
                    paddingTop: '*',
                    paddingBottom: '*'
                }),
                animate(timing1, style({
                    height: 0,
                    opacity: 0,
                    paddingTop: 0,
                    paddingBottom: 0
                }))
            ])
            
        ],
    );

