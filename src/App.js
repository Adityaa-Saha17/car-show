import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";

function CarShow() {
  return (
    <>
      <OrbitControls target0={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault position={[5, 5, 7]} fov={50} />
      <color args={[0, 0, 0]} attach="background" />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={150}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car envMap={texture} />
          </>
        )}
      </CubeCamera>

      <Rings />
      <Ground />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
