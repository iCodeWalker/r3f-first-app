# React three fiber

R3F is a react renderer. We write JSX and it gets rendered into three.js.

Ex : Creating a mesh composed of BoxGeometry and a MeshBasicMaterial
<mesh>
<BoxGeometry />
<MeshBasicMaterial />
</mesh>

R3F sets the default parameter. We don't need to define it.

## React three fiber setup

    npm install three @types/three @react-three/fiber

    The @ at the beginning means that it's part of a bigger system (which is called scope) named 'react-three'
    /fiber is the part that we are currently importing or retrieving

## The syntax

    A simple mesh
    <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red"/>
    </mesh>

    1. The Geometry and the material are automatically associated with the mesh.
    2. The r3f syntax is shorter and easier to understand.
    3. Default parameters are automatically set for us.

## Change position and roatation

    <mesh position = {[1,2,3]} rotation-x = {0.5}>
        <boxGeometry />
        <meshBasicMaterial color="red"/>
    </mesh>

## Nested Objects

    <group>
        <mesh position = {[1,2,3]} rotation-x = {0.5}>
            <boxGeometry />
            <meshBasicMaterial color="red"/>
        </mesh>

        <mesh position = {[1,2,3]} rotation-x = {0.5}>
            <sphereGeometry />
            <meshBasicMaterial color="orange"/>
        </mesh>
    </group>

## How r3f knows how to combine components

    We have two <mesh> inside a <group>
    r3f will create the group, then call add() on it and pass it two meshes, this happens in three.js

    r3f uses "attach" attribute.
    The attach attribute allows the developer to assign the component to a specific property of the parent instead of trying to add() it.

    1. The <boxGeometry> and <sphereGeometry> are assigned to the geometry property of the <mesh>
    2. The <meshBasicMaterial> is assigned to the material property of the <mesh>
    3. r3f won't try to add() them to the <mesh>

    But we don't have to write those 'attach' attributes.

    r3f will first check the name of the component
    1. If it ends with "Material", it will be assigned to the 'material' property.
    2. If it ends with "Geometry", it will be assigned to the 'geometry' property.

    Otherwise ref will be going to add() it.

## Resizing Canvas

    The <canvas> created by r3f will take the size of it's parent (the #root element).
    We will make the root fill the viewport and do the same with the <html> and the <body>

## Important points

    1. We didn't have to create a Scene.
    2. We didn't have to create the WebGLRenderer.
    3. The scene is being rendered on each frame.
    4. The default settings are making it look appealing(antialias, encoding, etc)
    5. We didn't have to place a PerspectiveCamera.
    6. We didn't have to pull it back from center.
    7. When you resize the viewport, everything that needs resizing is handled automatically.
    8. We didn't have to provide any specific value for the <torusKnotGeometry>
    9. We didn't have to import the mesh nor the sphereGeometry, nor the MeshNormalMaterial.
    10. We don't have to reload the page.

## three-fiber hooks

    We can use hooks specific to react three fiber inside experience component.

## Creating and handling meshes

    1. We can create mesh without importing the these tags. This type of coding is called "declarative".
    2. r3f will create the corresponding instances automatically and add them to the scene. (also created automatically)
    3. We can try new geometry <sphereGeometry/> and material <meshBasicMaterial/>

        sphereGeometry :
            The first three parameters of SphereGeometry are radius, widthSegments and heightSegments
            r3f provides the default values to this parameters but we can change them.
            We can change the constructor parameters by providing an array to the "args" attributes and follow the parameters order(radius, widthSegments, heightSegments)

            In case of geometry, we must be careful with the values of radius, widthSegment and heightSegment, we must not update these values too much or animate them, because each change will result in a whole new geometry built again. It is not good for performance.

        meshBasicMaterial :
            meshBasicMaterial only requires one parameter and it's an object.

## Mesh

    Like we changed the color and wireframe on the material, we can customise the position, rotation and scale on the mesh.
        Scale:
        scale = {[x,y,z]} , doing this is similar to mesh.scale.set(3,2,1). Can also use scale = {1.5}

        Position:
        position = {[2,0,0]},
        We can target specific axes with, position-x = {2}

        Rotation:
        rotation-y = {Math.PI * 0.25}

## Animate

    The scene is drawn on every frame, but nothing is moving right now, To move things around we need to animate the meshes.

    To move things around, (ex : rotate a cube), we will be using useFrame hook provided from r3f.
    Note :  useFrame hook can only be called from a component that is inside the <Canvas />.

    The callback function inside useFrame will be called on each frame before rendering the scene.

    To access the cube or any other object inside the useFrame we will use reference and not react state to update the rotation parameter, as if we use state to update or animate our whole component will get re-rendered on each frame and this is not good for performance.

    We can access the mesh with cubeRef.current and update it in the useFrame. Increment it's rotation.y property in the frame.

    We should take care of the frame rates and not increment rotation or any animation directly.
    We need to know how much time has passed since the last frame
