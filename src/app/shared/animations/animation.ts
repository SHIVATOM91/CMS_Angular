import { trigger ,animation ,style, transition, animate, state} from '@angular/animations';

export const  fade = trigger('fade', [
    state('void', style({opacity: 0})),
    transition('void => *', [
      animate('.5s ease-in')
    ])
  ])



