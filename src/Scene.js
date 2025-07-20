import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";
import { SpotLightHelper } from "three";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { useRef } from "react";
import { Boxes } from "./Boxes";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Vignette
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FloatingGrid } from "./FloatingGrid";

export default function CarShow() {
  const pinkRef = useRef();
  const blueRef = useRef();

  useHelper(pinkRef, SpotLightHelper, "hotpink");
  useHelper(blueRef, SpotLightHelper, "skyblue");

  return (
    <>
      <OrbitControls target0={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault position={[5, 3, 7]} fov={50} />
      <color args={[0, 0, 0]} attach="background" />
      <spotLight
        // ref={pinkRef}
        color={[1, 0.25, 0.7]}
        intensity={20}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        // ref={blueRef}
        color={[0.14, 0.5, 1]}
        intensity={20}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, -5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car envMap={texture} />
            <Ground envMap={texture} />
          </>
        )}
      </CubeCamera>
      <FloatingGrid />
      <Boxes />
      <Rings />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.0035}
          focalLength={0.005}
          bokehScale={3}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernalSize={5}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.ADD}
          offset={[0.0005, 0.0012]}
        />
        <Vignette
          eskil={false}
          offset={0.6} // Adjust for stronger/weaker vignette
          darkness={0.8} // 0 (no darkening) to 1 (full black)
        />
      </EffectComposer>
    </>
  );
}
