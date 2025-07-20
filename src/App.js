import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import "./style.css";
import CarShow from "./Scene";

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas>
          <CarShow />
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
