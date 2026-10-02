import React, { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { motion, useAnimationControls } from 'motion/react';
import { cn } from '../../lib/utils';

export interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 48,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  // Measure single content chunk size
  const contentSize = direction === 'horizontal' ? width : height;

  useEffect(() => {
    if (!contentSize || contentSize <= 0) return;

    const distance = contentSize + gap;
    const from = reverse ? -distance : 0;
    const to = reverse ? 0 : -distance;

    const currentDuration = isHovered && durationOnHover ? durationOnHover : duration;

    if (direction === 'horizontal') {
      controls.start({
        x: [from, to],
        transition: {
          duration: currentDuration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    } else {
      controls.start({
        y: [from, to],
        transition: {
          duration: currentDuration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    }
  }, [contentSize, gap, reverse, duration, durationOnHover, isHovered, direction, controls]);

  return (
    <div
      className={cn('relative overflow-hidden w-full', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={controls}
        className={cn(
          'flex w-max items-center will-change-transform',
          direction === 'vertical' ? 'flex-col' : 'flex-row'
        )}
        style={{ gap: `${gap}px` }}
      >
        <div
          ref={ref}
          className={cn(
            'flex shrink-0 items-center',
            direction === 'vertical' ? 'flex-col' : 'flex-row'
          )}
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center',
            direction === 'vertical' ? 'flex-col' : 'flex-row'
          )}
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center',
            direction === 'vertical' ? 'flex-col' : 'flex-row'
          )}
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default InfiniteSlider;
