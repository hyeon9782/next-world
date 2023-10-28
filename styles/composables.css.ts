import { style } from '@vanilla-extract/css';

export const dialogBackground = style([
  {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
]);

export const confirmDialog = style({
  height: '30%',
  width: '70%',
  background: 'white',
  borderRadius: '5px',
});
