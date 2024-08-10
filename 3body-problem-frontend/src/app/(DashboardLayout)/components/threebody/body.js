import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Body = ({ position, velocity, mass, color, updatePosition }) => {
  const meshRef = useRef();
  const [bodyPosition, setBodyPosition] = useState(position);
  const [bodyVelocity, setBodyVelocity] = useState(velocity);

  useFrame(({ clock }) => {
    // Simple update for simulation: update positions based on velocity
    const delta = clock.getDelta();
    const newPosition = new THREE.Vector3().fromArray(bodyPosition).add(
      new THREE.Vector3().fromArray(bodyVelocity).multiplyScalar(delta)
    );

    setBodyPosition(newPosition.toArray());
    meshRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);
    updatePosition(newPosition);
  });

  return (
    <mesh ref={meshRef} position={bodyPosition}>
      <sphereGeometry args={[mass * 0.01, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Body;
