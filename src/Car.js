import { useFrame, useLoader } from "@react-three/fiber";
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
        obj.castShadow = true;
        // obj.material.roughness = 0
        // obj.material.metalness = 1;
      }
    });
  }, [gltf, envMap]);


  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];
    group.children[0].rotation.x = t*2;
    group.children[2].rotation.x = t*2;
    group.children[4].rotation.x = t*2;
    group.children[6].rotation.x = t*2;
  })

  return <primitive object={gltf.scene} />;
}
