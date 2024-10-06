import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Drone } from "./Drone";

export const DroneSwarm = () => {
  const droneRefs = useRef<THREE.Group[]>([]);

  // useFrame((state, delta) => {
  //   const time = state.clock.getElapsedTime();
  //   droneRefs.current.forEach((drone, index) => {
  //     const radius = 1 + index * 2;
  //     const speed = 0.5 - index * 0.1;
  //     drone.position.x = Math.sin(time * speed) * radius;
  //     drone.position.z = Math.cos(time * speed) * radius;
  //     //drone.position.y = Math.sin(time * speed * 2) * 0.5 + 5;
  //     //drone.rotation.y = -time * speed;
  //   });
  // });

  return (
    <>
      {[0, 1, 2].map((index) => (
        <Drone
          key={index}
          ref={(el: any) => (droneRefs.current[index] = el!)}
          position={[0, 5, 0]}
          rotation={[0, 0, 0]}
          scale={1.2}
        />
      ))}
    </>
  );
};
