import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';

export class AnimationTools {

    public static fadeInOut(sec: number = 0.35): AnimationTriggerMetadata {
        return trigger("fadeInOut", [
            state("in", style({ opacity: 100 })),
            state("out", style({ opacity: 0 })),
            transition("in => out", [animate(sec + "s ease")]),
            transition("out => in", [animate(sec + "s ease")])
        ]);
    }

    public static shakeIt(sec: number = 1): AnimationTriggerMetadata {
        return trigger('shakeit', [
            state('shakestart', style({
                transform: 'scale(1)',
            })),
            state('shakeend', style({
                transform: 'scale(1)',
            })),
            transition('shakestart => shakeend', animate('1000ms ease-in', keyframes([
                style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
                style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
                style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
                style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
                style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
                style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
                style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
                style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
                style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
            ]))),
        ])
    };

}