'use client';

import { useEffect, useState } from 'react';

interface DeviceCapability {
  hasCustomCursor: boolean;
  supports3D: boolean;
  supportsMagnetic: boolean;
  supportsParallax: boolean;
  staggerMultiplier: number;
}

const DEFAULT: DeviceCapability = {
  hasCustomCursor: true,
  supports3D: true,
  supportsMagnetic: true,
  supportsParallax: true,
  staggerMultiplier: 1,
};

export function useDeviceCapability(): DeviceCapability {
  const [caps, setCaps] = useState<DeviceCapability>(DEFAULT);

  useEffect(() => {
    const isTouch  = window.matchMedia('(pointer: coarse)').matches;
    const cores    = navigator.hardwareConcurrency ?? 4;
    const isLowEnd = cores < 4;

    setCaps({
      hasCustomCursor:  !isTouch,
      supports3D:        cores >= 4,
      supportsMagnetic:  !isTouch,
      supportsParallax:  !isTouch && !isLowEnd,
      staggerMultiplier: isLowEnd ? 0.5 : 1,
    });
  }, []);

  return caps;
}
