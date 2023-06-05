/**
 * References
 * - Codesandbox with animations https://codesandbox.io/p/github/tlenclos/avaturn-threejs-example/draft/winter-sky
 * - Animations on https://www.mixamo.com/
 * - https://github.com/resonantdoghouse/threejs-dance
 */
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";
import { Vector3Tuple } from "three";
import { useLocalStorage } from "usehooks-ts";
import "./App.css";
import Avatar, { AvatarProps } from "./Avatar";
import DiscoBall from "./DiscoBall";
import Scene from "./Scene";

type CameraState = {
  position: Vector3Tuple;
};
const ANIMATIONS: AvatarProps["animation"][] = [
  "capoeira",
  "flair",
  "hip-hop-dancing",
  "robot-hip-hop",
  "silly-dancing",
  "thriller",
];

export default function App() {
  const [cameraState, setCameraState] = useLocalStorage<CameraState>("camera", {
    position: [3, 10, 12],
  });
  const positions = useControls("Positions", {
    Baptiste: [1, 0, -1],
    Thibault: [-1, 0, -1],
    Han: [0, 0, 0],
    Floor: [0, 0, 0],
    DiscoBall: [0, 3, 0],
  });
  const animations = useControls("Animations", {
    Baptiste: {
      value: "thriller",
      options: ANIMATIONS,
    },
    Thibault: {
      value: "hip-hop-dancing",
      options: ANIMATIONS,
    },
    Han: {
      value: "silly-dancing",
      options: ANIMATIONS,
    },
  });

  return (
    <Canvas camera={{ fov: 30, ...cameraState }}>
      <Suspense fallback={null}>
        <Avatar
          key={animations.Han}
          model="han"
          position={positions.Han}
          animation={animations.Han as AvatarProps["animation"]}
        />
        <Avatar
          key={animations.Baptiste}
          model="baptiste"
          position={positions.Baptiste}
          animation={animations.Baptiste as AvatarProps["animation"]}
        />
        <Avatar
          key={animations.Thibault}
          model="thibault"
          position={positions.Thibault}
          animation={animations.Thibault as AvatarProps["animation"]}
        />
        <Scene position={positions.Floor} />
        <DiscoBall position={positions.DiscoBall} />
        <OrbitControls
          onChange={(e) => {
            if (e) {
              setCameraState({
                position: Object.values(
                  e.target.object.position
                ) as Vector3Tuple,
              });
            }
          }}
        />
        <Environment preset="sunset" background />
      </Suspense>
    </Canvas>
  );
}
