"use client";

import React from 'react';
import Script from 'next/script';

export default function SplineRobot() {
  return (
    <>
      <Script
        type="module"
        src="https://cdn.spline.design/@splinetool/viewer@2.0.93/build/spline-viewer.js"
        strategy="beforeInteractive"
      />
      {React.createElement('spline-viewer', {
        url: "https://prod.spline.design/7s1iCLx-H-LOzHxC/scene.splinecode",
        'mouse-controls': "false"
      })}
    </>
  );
}
