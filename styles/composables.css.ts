import { style } from '@vanilla-extract/css';

export const dialogBackground = style([
  {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
]);

export const confirmModal = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '30%',
  width: '70%',
  background: 'white',
  borderRadius: '5px',
  padding: '10px',
});

export const confirmHeader = style({
  height: '15%',
  fontWeight: 'bold',
});

export const confirmSection = style({
  height: '70%',
});

export const confirmFooter = style({
  height: '15%',
  display: 'flex',
  justifyContent: 'space-around',
});

export const alertModal = style({
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '200px',
  width: '400px',
  background: 'white',
  borderRadius: '5px',
  padding: '10px',
});

export const alertHeader = style({
  height: '15%',
  fontWeight: 'bold',
});

export const alertSection = style({
  height: '70%',
});

export const alertFooter = style({
  height: '15%',
  display: 'flex',
  justifyContent: 'end',
});
