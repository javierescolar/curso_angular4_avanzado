import {animate,state,style,transition,trigger} from '@angular/animations';

export const fadeLateral =
  trigger('fadeLateral',[
    transition(':enter',[
      style({
        opacity: 0,
        transform: 'translateX(30%)'
      }),
      animate('500ms linear', style({
        opacity: 1,
        transform: 'translateX(0%)'
      }))
    ]),
  ]);
