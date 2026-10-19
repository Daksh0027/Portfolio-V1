"use client";

import Script from 'next/script';

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
