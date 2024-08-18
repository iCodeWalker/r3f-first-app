import { useRef } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject.js";

extend({ OrbitControls: OrbitControls });

export default function Practice() {
  // Retrieve state from three
  const { camera, gl } = useThree();
  // Create a reference for the mesh
  const cubeRef = useRef();

  // Create a group ref
  const groupRef = useRef();
  // The callback function inside useFrame will be called on each frame before rendering the scene
  useFrame((state, delta) => {
    // We should take care of the frame rates and not increment rotation or any animation directly.
    // We need to know how much time has passed since the last frame
    // cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.y += delta;

    //  rotate the whole group
    groupRef.current.rotation.y += delta;

    // state : state contains information about our Three.js environment like the camera, the renderer, the scene etc
    // delta : contains the time spent since the last frame in seconds.

    // ################# Animtaing the camera ################
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Orbital control */}
      <orbitControls args={[camera, gl.domElement]} />
      {/* Directional Lights */}
      <directionalLight position={[1, 2, 3]} />
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          {/* <meshBasicMaterial color="orange" /> */}
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          position-x={2}
          scale={1.5}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          {/* <meshBasicMaterial color="mediumpurple" /> */}
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1.15} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        {/* <meshBasicMaterial color="green" /> */}
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Custom Mesh */}
      <CustomObject />
    </>
  );
}
