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
