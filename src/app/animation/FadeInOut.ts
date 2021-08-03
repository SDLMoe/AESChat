import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function fadeInOut(sec: number = 0.35): AnimationTriggerMetadata {
    return trigger("fadeInOut", [
        state("in", style({ opacity: 100 })),
        state("out", style({ opacity: 0 })),
        transition("in => out", [animate(sec + "s ease")]),
        transition("out => in", [animate(sec + "s ease")])
    ]);
}