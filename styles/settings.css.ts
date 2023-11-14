import { style } from '@vanilla-extract/css';
import { fillGreenButton, redButton } from './common.css';

export const settingContainer = style({
  height: 'calc(100vh - 124px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const settingForm = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '0px 20px',
  boxSizing: 'border-box',
});

export const settingTitle = style({
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: '500',
  margin: '0.5rem 0',
});

export const updateButton = style([
  fillGreenButton,
  {
    float: 'right',
    padding: '0.75rem 1.5rem',
    fontSize: '1.25rem',
  },
]);

export const logoutButton = style([
  redButton,
  {
    float: 'left',
    fontWeight: 'normal',
    lineHeight: '1.25',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    marginTop: 20,
    marginLeft: 20,
  },
]);
