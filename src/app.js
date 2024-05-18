import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience.js";
import Practice from "./practice.js";

const App = () => {
  return (
    <Canvas>
      {/* <Experience /> */}
      <Practice />
    </Canvas>
  );
};

export default App;
