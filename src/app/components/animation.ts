import {animate,state,style,transition,trigger} from '@angular/animations';
//import { AnimationEntryMetadata} from '@angular/core';

export const fadeIn =
  trigger('fadeIn',[
    transition(':enter',[
      style({
        opacity: 0,
        transform: 'translateY(-20%)'
      }),
      animate('300ms linear', style({
        opacity: 1,
        transform: 'translateY(0%)'
      }))
    ]),
  ]);
