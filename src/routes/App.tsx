/**
 * References
 * - Codesandbox with animations https://codesandbox.io/p/github/tlenclos/avaturn-threejs-example/draft/winter-sky
 * - Animations on https://www.mixamo.com/
 * - https://github.com/resonantdoghouse/threejs-dance
 */
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
import { Suspense } from "react";
import { Vector3Tuple } from "three";
import { useLocalStorage } from "usehooks-ts";
import Avatar, { AvatarProps } from "../components/Avatar";
import DiscoBall from "../components/DiscoBall";
import Scene from "../components/Scene";
import useAnimationsDatabase from "../hooks/useAnimationsDatabase";
import { MEMBERS } from "../lib/members";
import "./App.css";

type CameraState = {
  position: Vector3Tuple;
};

export default function App() {
  const [cameraState, setCameraState] = useLocalStorage<CameraState>("camera", {
    position: [3, 10, 12],
  });
  const positions = {
    Baptiste: [1, 0, 1],
    Thibault: [-1, 0, -1],
    Han: [0, 0, 0],
    Quentin: [1, 0, -1],
    Laureen: [-1, 0, 1],
    Hugo: [-2, 0, 0],
    Ariel: [2, 0, 0],
    Colin: [-2, 0, 2],
    Vincent: [2, 0, 2],
    Lucie: [0, 0, 2],
    Floor: [0, 0, 0],
    DiscoBall: [0, 3, 0],
  };
  // Hide controls for the live scene
  // const positions = useControls(
  //   "Positions",
  //   {
  //     Baptiste: [1, 0, 1],
  //     Thibault: [-1, 0, -1],
  //     Han: [0, 0, 0],
  //     Quentin: [1, 0, -1],
  //     Laureen: [-1, 0, 1],
  //     Hugo: [-2, 0, 0],
  //     Ariel: [2, 0, 0],
  //     Colin: [-2, 0, 2],
  //     Vincent: [2, 0, 2],
  //     Lucie: [0, 0, 2],
  //     Floor: [0, 0, 0],
  //     DiscoBall: [0, 3, 0],
  //   },
  //   { collapsed: true }
  // );
  const { animations } = useAnimationsDatabase({
    collapsed: true,
  });

  return (
    <Canvas camera={{ fov: 30, ...cameraState }} style={{ backgroundColor: "black" }}>
      <meshBasicMaterial color='black' wireframe />
      <Suspense fallback={null}>
        {MEMBERS.map((member) => (
          <Avatar
            // @ts-expect-error
            key={`${member}-${animations[member]}`}
            // @ts-expect-error
            model={member.toLowerCase()}
            // @ts-expect-error
            position={positions[member]}
            // @ts-expect-error
            animation={animations[member] as AvatarProps["animation"]}
          />
        ))}
        {/* @ts-expect-error */}
        <Scene position={positions.Floor} />
        {/* @ts-expect-error */}
        <DiscoBall position={positions.DiscoBall} />
        <OrbitControls
          onChange={(e) => {
            if (e) {
              setCameraState({
                position: Object.values(e.target.object.position) as Vector3Tuple,
              });
            }
          }}
        />
        <Stars />
        <Environment preset='sunset' />
      </Suspense>
    </Canvas>
  );
}
