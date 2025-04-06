/**
 * References
 * - Codesandbox with animations https://codesandbox.io/p/github/tlenclos/avaturn-threejs-example/draft/winter-sky
 * - Animations on https://www.mixamo.com/
 * - https://github.com/resonantdoghouse/threejs-dance
 */
import { Environment, OrbitControls, Stage, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
import { Suspense, useState } from "react";
import { Vector3Tuple } from "three";
import { useLocalStorage } from "usehooks-ts";
import Avatar, { AvatarProps } from "../components/Avatar";
import DiscoBall from "../components/DiscoBall";
import Scene from "../components/Scene";
import useAnimationsDatabase from "../hooks/useAnimationsDatabase";
import { MEMBERS } from "../lib/members";
import "./App.css";
import { useControls } from "leva";

type CameraState = {
  position: Vector3Tuple;
};

export default function App() {
  const url = new URL(window.location.href);
  const featureFlags = {
    dancefloor: url.searchParams.has("dancefloor"),
  };
  const autoRotateSpeed = url.searchParams.has("autoRotateSpeed") ? Number(url.searchParams.get("autoRotateSpeed")) : 1;
  const [cameraState, setCameraState] = useState<CameraState>({
    position: [3, 2, 5],
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
        {MEMBERS.map((member, index) => (
          <Avatar
            index={index}
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
          autoRotate
          autoRotateSpeed={autoRotateSpeed}
          onChange={(e) => {
            if (e) {
              setCameraState({
                position: Object.values(e.target.object.position) as Vector3Tuple,
              });
            }
          }}
        />
        <Stars />
        <Stage environment={{ files: "venice_sunset_1k.hdr" }} />
      </Suspense>
    </Canvas>
  );
}
