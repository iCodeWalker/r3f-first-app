import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

export default function CustomObject() {
  // reference for geometry to compute normals
  const geometryRef = useRef();
  // 1. We create a variable for vertices count. Ex we need 10 triangles and vertices per triangle is 3
  const verticesCount = 10 * 3;

  // 2. We create the Float32Array that will contain all the vertices positions, and we need to specify the size
  // of the array.
  // multipled by 3, because we have 30 position, and for every position we need 3 values (x,y,z)
  // i.e. 3 values per vertex
  //   const positions = new Float32Array(verticesCount * 3);

  //   // 3. Now we can fill this array with values
  //   for (let i = 0; i < verticesCount * 3; i++) {
  //     positions[i] = (Math.random() - 0.5) * 3;
  //   }

  // 4. Now we create buffer geometry and add buffer attribute, we need to specify that this attribute is the
  // position attribute, We can do that with the attach attribute
  // "attributes-position" will result in the BufferAttribute attaching itself to the geometry.attribute.position

  // 5. We need 3 more attributes
  // count : how many vertices
  // itemSize : how many items from the array compose one vertex
  // array : the actual array

  // ############ useMemo for optimization ##############
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    // 3. Now we can fill this array with values
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshBasicMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}
