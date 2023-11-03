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
  height: '150px',
  width: '300px',
  background: 'white',
  borderRadius: '5px',
  padding: '10px',
  boxSizing: 'border-box',
});

export const confirmHeader = style({
  height: '15%',
  fontWeight: 'bold',
});

export const confirmSection = style({
  height: '65%',
  display: 'flex',
  alignItems: 'center',
});

export const confirmFooter = style({
  height: '20%',
  display: 'flex',
  justifyContent: 'space-around',
});

export const alertModal = style({
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '150px',
  width: '300px',
  background: 'white',
  borderRadius: '5px',
  padding: '10px',
});

export const alertHeader = style({
  // height: '15%',
  fontWeight: 'bold',
});

export const alertSection = style({
  height: '80%',
  display: 'flex',
  alignItems: 'center',
});

export const alertFooter = style({
  height: '20%',
  display: 'flex',
  justifyContent: 'flex-end',
});
