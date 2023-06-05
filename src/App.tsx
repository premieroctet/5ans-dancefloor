/**
 * References
 * - Codesandbox with animations https://codesandbox.io/p/github/tlenclos/avaturn-threejs-example/draft/winter-sky
 * - Animations on https://www.mixamo.com/
 * - https://github.com/resonantdoghouse/threejs-dance
 */
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { Canvas, GroupProps, useLoader } from "@react-three/fiber";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
// @ts-ignore
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { Environment, OrbitControls, useAnimations } from "@react-three/drei";
import "./App.css";

const animationGroup = new THREE.AnimationObjectGroup();
const mixer = new THREE.AnimationMixer(animationGroup);

function filterAnimation(animation: any) {
  animation.tracks = animation.tracks.filter((track) => {
    const name = track.name;
    return name.endsWith("Hips.position") || name.endsWith(".quaternion");
  });
  return animation;
}

const Han = (props: GroupProps) => {
  const obj = useLoader(GLTFLoader, "models/han.glb");

  const animationObject = useLoader(GLTFLoader, "animations/standing.glb");
  const { ref, actions, names } = useAnimations(animationObject.animations);
  useEffect(() => {
    actions[names[0]].play();
  }, []);

  return (
    <group ref={ref} {...props}>
      <primitive object={obj.scene} />
    </group>
  );
};

const Baptiste = (props: GroupProps) => {
  const obj = useLoader(GLTFLoader, "models/baptiste.glb");

  // TODO Make Mixamo dance work
  // const animationObject = useLoader(
  //   FBXLoader,
  //   "animations/Capoeira.fbx",
  //   (model) => animationGroup.add(model)
  // );

  // console.log("animationObject", animationObject);
  // console.log("obj", obj);

  // useEffect(() => {
  //   const clip = filterAnimation(animationObject.animations[0]);
  //   const action = mixer.clipAction(clip);
  //   action.play();
  // }, []);

  return (
    <group {...props}>
      <primitive object={obj.scene} />
    </group>
  );
};

export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Han position={[0, 0, 0]} />
        <Baptiste position={[1, 0, -1]} />
        <OrbitControls />
        <Environment preset="sunset" background />
      </Suspense>
    </Canvas>
  );
}
