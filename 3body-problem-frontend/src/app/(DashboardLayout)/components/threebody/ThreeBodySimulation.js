'use client';
import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { OrbitControls, Stars, Environment } from '@react-three/drei';

// Gravitational constant
const G = 6.67430e-11;

const distance = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) +
    Math.pow(pos1[1] - pos2[1], 2) +
    Math.pow(pos1[2] - pos2[2], 2)
  );
};

const calculateForce = (body1, body2) => {
  const r = distance(body1.position, body2.position);
  const forceMagnitude = (G * body1.mass * body2.mass) / (r * r);

  const forceDirection = [
    (body2.position[0] - body1.position[0]) / r,
    (body2.position[1] - body1.position[1]) / r,
    (body2.position[2] - body1.position[2]) / r,
  ];

  return forceDirection.map(direction => forceMagnitude * direction);
};

const updateBody = (body, otherBodies, deltaTime) => {
  let totalForce = [0, 0, 0];

  otherBodies.forEach(otherBody => {
    const force = calculateForce(body, otherBody);
    totalForce = totalForce.map((f, i) => f + force[i]);
  });

  const acceleration = totalForce.map(f => f / body.mass);
  body.velocity = body.velocity.map((v, i) => v + acceleration[i] * deltaTime);

  body.position = body.position.map((p, i) => p + body.velocity[i] * deltaTime);
};

const calculateCenterOfMass = (bodies) => {
  let totalMass = bodies.reduce((sum, body) => sum + body.mass, 0);
  let centerOfMass = [0, 0, 0];

  bodies.forEach(body => {
    centerOfMass = centerOfMass.map(
      (coord, i) => coord + (body.position[i] * body.mass) / totalMass
    );
  });

  return centerOfMass;
};

const Simulation = ({ bodies, setBodies, running }) => {
  useFrame(({ clock }) => {
    if (running) {
      const deltaTime = clock.getDelta();
      const newBodies = [...bodies];

      newBodies.forEach((body, index) => {
        const otherBodies = newBodies.filter((_, i) => i !== index);
        updateBody(body, otherBodies, deltaTime);
      });

      setBodies(newBodies);
    }
  });

  const centerOfMass = calculateCenterOfMass(bodies);

  return (
    <>
      {bodies.map((body, index) => (
        <mesh position={body.position} key={index}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color={body.color} />
        </mesh>
      ))}

      <mesh position={centerOfMass}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {bodies.map((body, index) => (
        <Line
          key={`line-${index}`}
          points={[body.position, centerOfMass]}
          color="white"
          lineWidth={1}
        />
      ))}
    </>
  );
};

const ThreeBodySimulation = () => {
  const [bodies, setBodies] = useState([
    { position: [0, 0, 0], velocity: [0, 0.2, 0], mass: 5e14, color: '#ff6347' },
    { position: [1, 0, 0], velocity: [0, -0.1, 0], mass: 5e14, color: '#4682b4' },
    { position: [-1, 0, 0], velocity: [0, 0.1, 0], mass: 5e14, color: '#32cd32' },
  ]);
  const [initialBodies, setInitialBodies] = useState(bodies);
  const [running, setRunning] = useState(false);

  const resetSimulation = () => {
    setBodies(initialBodies.map(body => ({ ...body })));
    setRunning(false);
  };

  const startSimulation = () => {
    setRunning(true);
  };

  const handleInputChange = (index, field, value) => {
    const updatedBodies = [...initialBodies];
    updatedBodies[index] = {
      ...updatedBodies[index],
      [field]: field === 'position' || field === 'velocity' ? value.split(',').map(Number) : parseFloat(value),
    };
    setInitialBodies(updatedBodies);
  };

  useEffect(() => {
    resetSimulation();
  }, [initialBodies]);

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="mb-4">
        {bodies.map((body, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-white">Body {index + 1}</h3>
            <input
              type="text"
              placeholder="Position (x,y,z)"
              className="mb-1 p-2"
              defaultValue={body.position.join(',')}
              onBlur={(e) => handleInputChange(index, 'position', e.target.value)}
            />
            <input
              type="text"
              placeholder="Velocity (vx,vy,vz)"
              className="mb-1 p-2"
              defaultValue={body.velocity.join(',')}
              onBlur={(e) => handleInputChange(index, 'velocity', e.target.value)}
            />
            <input
              type="number"
              placeholder="Mass"
              className="p-2"
              defaultValue={body.mass}
              onBlur={(e) => handleInputChange(index, 'mass', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex mb-4">
        <button className="mr-2 p-2 bg-blue-500 text-white" onClick={startSimulation}>Start</button>
        <button className="p-2 bg-red-500 text-white" onClick={resetSimulation}>Reset</button>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ height: '50%', width: '100%' }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Stars radius={100} depth={50} count={10000} />
        <Environment background>
          <color attach="background" args={['#000000']} />
        </Environment>
        <OrbitControls />
        <Simulation bodies={bodies} setBodies={setBodies} running={running} />
      </Canvas>
    </div>
  );
};

export default ThreeBodySimulation;
