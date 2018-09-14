import { trigger ,animation ,style, transition, animate, state} from '@angular/animations';

export const  fade = trigger('fade', [
  state("open", style({opacity: 1})),
  state("closed", style({opacity: 0})),
  transition("open <=> closed", animate( "300000ms" )),
])


 


