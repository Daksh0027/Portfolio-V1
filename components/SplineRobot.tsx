"use client";

import React from 'react';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          'mouse-controls'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function SplineRobot() {
  return (
    <>
      <Script
        type="module"
        src="https://cdn.spline.design/@splinetool/viewer@2.0.93/build/spline-viewer.js"
        strategy="beforeInteractive"
      />
      <spline-viewer 
        url="https://prod.spline.design/7s1iCLx-H-LOzHxC/scene.splinecode"
        mouse-controls="false"
      ></spline-viewer>
    </>
  );
}
