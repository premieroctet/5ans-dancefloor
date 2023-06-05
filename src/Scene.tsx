import { GroupProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations } from "@react-three/drei";
import { useEffect } from "react";

export type SceneProps = {} & GroupProps;

export default function Scene({ ...props }: SceneProps) {
  const obj = useLoader(
    GLTFLoader,
    `models/animated_dance_floor_neon_lights/scene.gltf`
  );

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
