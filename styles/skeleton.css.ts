import { createVar, keyframes, style } from '@vanilla-extract/css';

export const skeletonAnimation = keyframes({
  '0%': {
    backgroundPosition: '-200%',
  },
  '100%': {
    backgroundPosition: '200%',
  },
});

export const skeletonWidth = createVar();

export const skeletonHeight = createVar();

export const skeletonBackground = createVar();

export const skeletonRadius = createVar();

export const skeletonPlaceholder = style({
  width: skeletonWidth,
  height: skeletonHeight,
  borderRadius: skeletonRadius,
  background: `linear-gradient(90deg,
    ${skeletonBackground || '#f0f0f0'} 25%,
    #e0e0e0 50%,
    ${skeletonBackground || '#f0f0f0'} 75%
  )`,
  backgroundSize: '200% 100%',
  animationName: skeletonAnimation,
  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
});

export const articlePreviewSkeleton = style({
  padding: '10px',
});

export const articlePreviewHead = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
});

export const articlePreviewSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const articlePreviewFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const articlePreviewTags = style({
  display: 'flex',
  gap: 10,
});

export const articleList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  marginTop: 20,
});
