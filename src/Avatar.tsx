import { GroupProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-expect-error
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";

export type AvatarProps = {
  model:
    | "baptiste"
    | "thibault"
    | "han"
    | "quentin"
    | "laureen"
    | "hugo"
    | "ariel";
  animation?:
    | "capoeira"
    | "flair"
    | "hip-hop-dancing"
    | "robot-hip-hop"
    | "silly-dancing"
    | "thriller";
} & GroupProps;

export default function Avatar({
  model,
  animation = "silly-dancing",
  ...props
}: AvatarProps) {
  const obj = useLoader(GLTFLoader, `models/${model}.glb`);

  const animationObject = useLoader(FBXLoader, `animations/${animation}.fbx`);
  const { ref, actions, names } = useAnimations(animationObject.animations);

  useEffect(() => {
    actions[names[0]]?.play();
  }, [animation]);

  return (
    // @ts-expect-error
    <group {...props} ref={ref}>
      <primitive object={obj.scene} />
    </group>
  );
}
