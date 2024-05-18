export default function Practice() {
  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
      <mesh position-x={2} scale={1.5}>
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>
      <mesh position-y={-1.15} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
}
