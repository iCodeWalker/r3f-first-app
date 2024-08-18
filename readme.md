# React three fiber

R3F is a react renderer.
like in react we write JSX and it gets compiled into a website.

React renderer takes the JSX and compiles it into a Three.js scene.
We write JSX and it gets rendered into three.js.

React Three Fiber will also take care of a lot of default setting for us.

R3F will sets the default parameter. We don't need to define it.

Ex : Creating a mesh composed of BoxGeometry and a MeshBasicMaterial
<mesh>
<BoxGeometry />
<MeshBasicMaterial />
</mesh>

## React three fiber setup

    npm install three @types/three @react-three/fiber

    The @ at the beginning means that it's part of a bigger system (which is called scope) named 'react-three'.
    /fiber is the part that we are currently importing or retrieving

## The syntax

    In native Three.js : --

        const mesh = new THREE.Mesh();
        mesh.geometry = new THREE.BoxGeometry(1,1,1);
        mesh.material = new THREE.MeshBasicMaterial({color: "red"})

        scene.add(mesh);

    In React Three Fiber : --

        A simple mesh
        <mesh>
            <boxGeometry />
            <meshBasicMaterial color="red"/>
        </mesh>

        1. The Geometry and the material are automatically associated with the mesh. Because it is inside the Mesh.
        2. The r3f syntax is shorter and easier to understand.
        3. Default parameters are automatically set for us. (Ex : we don't need to provide 1,1,1 value to box geometry)

## Change position and roatation

    In native Three.js

        const mesh = new THREE.Mesh();
        mesh.position.set(1,2,3);
        mesh.rotation.x = 0.5;
        mesh.geometry = new THREE.BoxGeometry(1,1,1);
        mesh.material = new THREE.MeshBasicMaterial({color : "red"});

        scene.add(mesh);

    In React Three Fiber : --

        <mesh position = {[1,2,3]} rotation-x = {0.5}>
            <boxGeometry />
            <meshBasicMaterial color="red"/>
        </mesh>

## Nested Objects

    In native Three.js

        const group = new THREE.Group();
        scene.add(group);

        const mesh1 = new THREE.Mesh();
        mesh1.geometry = new THREE.BoxGeometry(1,1,1);
        mesh1.material = new THREE.MeshBasicMaterial({color : "red"});

        const mesh2 = new THREE.Mesh();
        mesh2.geometry = new THREE.SpherGeometry(1,1,1);
        mesh2.material = new THREE.MeshBasicMaterial({color : "orange"});

        group.add(mesh1, mesh2);

    In React Three Fiber : --


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

    NOTE : -- When we use attach property the React Three Fiber will not add it to it's parent but it will attach it to the specific property of the parent, that we will pass into the attach property.

    1. The <boxGeometry> and <sphereGeometry> are assigned to the geometry property of the <mesh>
    2. The <meshBasicMaterial> is assigned to the material property of the <mesh>
    3. r3f won't try to add() them to the <mesh>

    But we don't have to write those 'attach' attributes.

    r3f will first check the name of the component
    1. If it ends with "Material", it will be assigned to the 'material' property.
    2. If it ends with "Geometry", it will be assigned to the 'geometry' property.

    Otherwise r3f will be going to add() it.

## Canvas

    Creating first canvas :-

    <Canvas>
        <mesh>
            <torusKnotGeometry />
            <meshNormalMaterial />
        </mesh>
    </Canvas>

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

    We can use hooks that will only work in components created inside the Canvas.
    We can use hooks specific to react three fiber inside experience component.

## Creating and handling meshes

    1. We can create mesh without importing the these tags. This type of coding is called "declarative".
    2. r3f will create the corresponding instances automatically and add them to the scene. (also created automatically)
    3. We can try new geometry <sphereGeometry/> and material <meshBasicMaterial/>

        sphereGeometry :
            The first three parameters of SphereGeometry are radius, widthSegments and heightSegments
            r3f provides the default values to this parameters but we can change them.

            We can change the constructor parameters by providing an array to the "args" attributes and follow the parameters order(radius, widthSegments, heightSegments)

            Note : In case of geometry, we must be careful with the values of radius, widthSegment and heightSegment, we must not update these values too much or animate them, because each change will result in a whole new geometry built again. It is not good for performance.

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
        We can target specific axes with, rotation-x = {Math.PI * 0.25}

        Note : The order of the meshes are not relevant like in native three.js

## Animate

    The scene is drawn on every frame, but nothing is moving right now, To move things around we need to animate the meshes.

    To move things around, (ex : rotate a cube), we will be using useFrame hook provided from r3f.
    Note :  useFrame hook can only be called from a component that is inside the <Canvas />.

    The callback function inside useFrame will be called on each frame before rendering the scene.

    To access the cube or any other object inside the useFrame we will use reference and not react state to update the rotation parameter, as if we use state to update or animate our whole component will get re-rendered on each frame and this is not good for performance.

    We can access the mesh with cubeRef.current and update it in the useFrame. Increment it's rotation.y property in the frame.

    We should take care of the frame rates and not increment rotation or any animation directly.
    We need to know how much time has passed since the last frame

## Group

    We can group objects together like we did it in three.js
    For ex : we can group  the cube and the sphere and then animate that group like a carousel.

## Orbit control

    In order to rotate the camera around the scene, we need to add OrbitalControl.

    Orbit control isn't part of the default Three.js classes (in the Three variable).
    We can't declare it like a <mesh> or <boxGeometry>

    Here we are going to import it and convert it into declarative version.
    and use the extend function from @react-three/fiber

    extend function will automatically convert a Three.js class into a declarative version and make it available in JSX.

    orbital control requires camera and the canvas, but it is not available to us at component level, it is availble inside the useFrame but we don't want to create orbital control on every frame. We just want to get them at the beginning. For this we can use a hook useThree().

## Lights

    Directional light
    meshBasicMaterial does not need any light, light has no effect on it.

    So to see any effect of light we need to change the material. Ex : meshStandardMaterial.

    Note : By deafult the light comes from straight above, We can change this with the position property
      <directionalLight  position={[1,2,3]}/>
      We can also change the properties like color and the intensity

    The core shadow (back part of the object) are little too dark, We can add an ambient light for that.
    <ambientLight />

## Custom Geometries

    Creating a custom Geometry is a bit harder, but it is very convenient once we understood how it works.

    We are going to create a mesh with its geometry composed of random triangles.

    Steps:
    1. Create a Float32Array.
    2. Put a bunch of values in it.
    3. Create a BufferAttribute out of this Float32Array.
    4. Add it to the attributes of the BufferGeometry.

    1. We create a variable for vertices count. Ex we need 10 triangles and vertices per triangle is 3
        const verticesCount = 10 * 3;

    2. We create the Float32Array that will contain all the vertices positions, and we need to specify the size
        of the array.
        const positions = new Float32Array(verticesCount * 3);

        multipled by 3, because we have 30 position, and for every position we need 3 values (x,y,z)
        i.e. 3 values per vertex


    3. Now we can fill this array with values
        for (let i = 0; i < verticesCount _ 3; i++) {
            positions[i] = (Math.random() - 0.5) _ 3;
        }

    4. Now we create buffer geometry and add buffer attribute, we need to specify that this attribute is the
        position attribute, We can do that with the attach attribute
        "attributes-position" will result in the BufferAttribute attaching itself to the geometry.attribute.position

    5. We need 3 more attributes
        count : how many vertices
        itemSize : how many items from the array compose one vertex
        array : the actual array

## Optimized using useMemo

    The code inside the CustomObject function will be called every time the component needs to be render.
    We use useMemo for optimization, so the function didn't gets called on every render.

## Compute normals

    We didn't provide any normal to the geometry and the triangles don't know where they are oriented.

    Instead of calculating and sending our own normal attribute,  we can ask Three.js to do it with "computeVertexNormals" on BufferGeometry

## Canvas Settings

    The <Canvas> component is setting up bunch of things for us (scene, camera, renderer, antialias, encoding etc). so that it looks good with minimal effort.

    These settings can be changed with the attributes right on the <Canvas>

    1. Camera
        Add camera attribute to the canvas and pass it a object
        Animating the camera

    2. Antialias
        Antialias is on by default.
        We can remove it by adding a gl attribute to the <Canvas> and send it an object, as we did with the camera

    3. Color encoding is a way of encoding and decoding colors so that we store color information in a more optimisied way since we are limited by the amount of possible values.

    Usually want to output colors as sRGBEncoding, but we can change it to LinerEncoding if needed.

    4. Alpha
        The background of the renderer is tranparent
    5. Pixel ratio
        r3f handles the pixel ratio automatically, It's good practice to clamp it in order to avoid performance issues on devices with a vary high pixel ratio.
        dpr ={1}

        we can also use an array containing minimum and maximum value
        dpr = {[ 1, 2 ]}
