import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0, // Use opacity for the general case as well
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }), // Starting opacity for all entering elements
      ],
      { optional: true }
    ),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate('200ms ease-out', style({ opacity: 0 })), // Animate all leaving elements to fade out
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate('300ms ease-out', style({ opacity: 1 })), // Animate all entering elements to fade in
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);
