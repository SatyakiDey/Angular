import {trigger,state,style,animate,transition} from '@angular/animations';
 
export function visibility(){
    return trigger('visibility',[ //naming the trigger as 'visibility'
      state('shown',style({
        transform:'scale(1.0)', //declaring the attributes of the states and the name of the state
        opacity:1
      })),
      state('hidden',style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('* =>*',animate('0.5s ease-in-out')) //declaring the animation when moving form one state to another
    ]);
}

export function flyInOut(){
    return trigger('flyInOut',[
        state('*',style({
          opacity:1,
          transform:'translateX(0)' //declaring that state as "*" means that it can in be any state. Other attributes are basic CSS animation properties .
        })),
        transition(':enter',[
          style({ 
            transform:'translateX(-100%)', //":enter" declares that the transition will be triggered when this state is entered from a 'void' state for any component which implements this trigger in it's teamplate and component file.
            opacity:0
          }),
          animate('500ms ease-in')
        ]),
        transition(':leave',[
          animate('500ms ease-out',style({
            transform:'translateX(100%)', //":leave" declares that the transition will be triggered when this state is left for any other state.
            opacity:0
          }))
        ])
    ])
}

export function expand(){
  return trigger('expand',[
    state('*',
    style({
      opacity:1,
      transform:'translateX(0)'
    })),
    transition(':enter',[
          style({
            transform:'translateY(-50%)',
            opacity:0
          }),
          animate('200ms ease-in',style({
            opacity:1,
            transform:'translateX(0)'
          }))
    ]),
  ]);
}