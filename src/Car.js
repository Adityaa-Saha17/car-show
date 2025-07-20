import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function Car({ envMap }) {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/model/car/scene.gltf"
  );

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.envMap = envMap;
        obj.material.envMapIntensity = 40;
        obj.material.needsUpdate = true;
      }
    });
  }, [gltf, envMap]);

  return <primitive object={gltf.scene} />;
}
