export default function Experience() {
  return (
    <>
      <mesh>
        {/* <torusKnotGeometry />
        <meshNormalMaterial /> */}
        {/* passing the attributes for radius, width and height segments */}
        <sphereGeometry args={[1.5, 32, 32]} />
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
