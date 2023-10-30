import {
  skeletonBackground,
  skeletonHeight,
  skeletonPlaceholder,
  skeletonRadius,
  skeletonWidth,
} from '@/styles/skeleton.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ReactNode } from 'react';

type Props = {
  width: string;
  height: string;
  radius: string;
  children?: ReactNode;
  color: string;
};
const SkeletonElement = ({ width, height, radius, children, color }: Props) => {
  return (
    <div
      className={skeletonPlaceholder}
      style={assignInlineVars({
        [skeletonWidth]: width,
        [skeletonHeight]: height,
        [skeletonBackground]: color,
        [skeletonRadius]: radius,
      })}
    >
      {children}
    </div>
  );
};

export default SkeletonElement;
