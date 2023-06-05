import { GroupProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-expect-error
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { useAnimations } from "@react-three/drei";
import { useEffect } from "react";

export type DiscoBallProps = {} & GroupProps;

export default function DiscoBall({ ...props }: DiscoBallProps) {
  const obj = useLoader(GLTFLoader, `models/disco-ball.glb`);
  const { ref, actions, names } = useAnimations(obj.animations);

  useEffect(() => {
    actions[names[0]]?.play();
  }, []);

  return (
    // @ts-expect-error
    <group {...props} ref={ref}>
      <primitive object={obj.scene} />
    </group>
  );
}
