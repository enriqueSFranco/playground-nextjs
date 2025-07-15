'use client';

import { UserRound } from 'lucide-react';
import { useState } from 'react';

type AvatarProps = {
  src?: URL;
  alt?: string;
  variant?: 'rounded' | 'square' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  withBorder?: boolean;
  color?: string;
};

const sizeMap = {
  xs: 20,
  sm: 25,
  md: 30,
  lg: 35,
  xl: 40,
  xxl: 80,
};

export function Avatar({
  src,
  alt = 'Avatar',
  variant = 'rounded',
  size = 'md',
  withBorder = false,
  color = '#ccc',
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const dimension = sizeMap[size];
  const borderRadius = {
    rounded: '8px',
    square: '0px',
    full: '50%',
  }[variant];

  const showFallback = !src || hasError;

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        borderRadius,
        overflow: 'hidden',
        border: withBorder ? `2px solid ${color}` : 'none',
      }}
      className="grid place-content-center bg-gray-100"
      role="img"
      aria-label={alt}
    >
      {showFallback ? (
        <UserRound size={dimension * 0.6} className="stroke-gray-500" />
      ) : (
        <img
          src={src.href}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover block"
        />
      )}
    </div>
  );
}
