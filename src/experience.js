export default function Experience() {
  return (
    <>
      {/* <mesh scale={[3, 2, 3]} position={[2, 0, 0]}> */}
      {/* <mesh scale={1.5} position={[2, 0, 0]}> */}
      <mesh scale={1.5} position={[2, 0, 0]} rotation-y={Math.PI * 0.25}>
        {/* We can target specific axes
      <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25}> */}

        {/* <torusKnotGeometry />
        <meshNormalMaterial /> */}
        {/* passing the attributes for radius, width and height segments */}
        {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
        <boxGeometry />
        {/* <meshBasicMaterial
          args={[
            {
              color: "red",
              wireframe: true,
            },
          ]}
        /> */}
        {/* We can control the color and the wireframe with the attributes having the same names */}
        <meshBasicMaterial color="red" wireframe={true} />
      </mesh>
    </>
  );
}
