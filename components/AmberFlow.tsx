"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function AmberFlow() {
  return (
    <div className="amber-flow" data-testid="amber-flow" aria-hidden="true">
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        pixelDensity={1}
        fov={45}
        pointerEvents="none"
      >
        <ShaderGradient
          control="props"
          animate="on"
          type="waterPlane"
          shader="defaults"
          uTime={0}
          uSpeed={0.1}
          uStrength={1.3}
          uDensity={0.7}
          uFrequency={5.5}
          uAmplitude={3.2}
          positionX={2.3}
          positionY={0}
          positionZ={0}
          rotationX={130}
          rotationY={110}
          rotationZ={50}
          color1="#ff7300"
          color2="#ff0000"
          color3="#ffffff"
          reflection={0.4}
          cAzimuthAngle={260}
          cPolarAngle={160}
          cDistance={1}
          cameraZoom={15.1}
          lightType="env"
          envPreset="lobby"
          brightness={0.8}
          grain="off"
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
