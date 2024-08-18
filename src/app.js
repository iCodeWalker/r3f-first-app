import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience.js";
import Practice from "./practice.js";

const App = () => {
  return (
    <Canvas
      // orthographic
      camera={{
        fov: 45,
        // zoom: 100, works with orthographic camera
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
      gl={{
        // antialias: false,
        // toneMapping: THREE.CineonToneMapping, // THREE.ACESFilmicToneMapping
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      dpr={1}
    >
      {/* <Experience /> */}
      <Practice />
    </Canvas>
  );
};

export default App;
