import { style } from '@vanilla-extract/css';
import { ResponsiveStyleParams } from './common.css';

const responsiveStyle = ({ tablet, desktop }: ResponsiveStyleParams) => ({
  '@media': {
    'screen and (min-width: 768px)': tablet,
    'screen and (min-width: 1024px)': desktop,
  },
});

export const homeSection = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  responsiveStyle({
    tablet: { width: '768px' },
    desktop: { width: '1140px' },
  }),
]);

export const banner = style([
  {
    padding: '2rem',
    color: '#fff',
    boxShadow: 'inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)',
  },
]);

export const bannerTitle = style({
  fontSize: '3.5rem',
  paddingBottom: '0.5rem',
  textShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)',
});

export const bannerDescription = style({
  fontSize: '1.5rem',
  margin: 0,
  fontWeight: 300,
});
