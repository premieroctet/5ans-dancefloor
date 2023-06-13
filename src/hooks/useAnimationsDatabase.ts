import { onValue, ref, update } from "firebase/database";
import { useControls } from "leva";
import { useEffect } from "react";
import { ANIMATIONS } from "../lib/animations";
import { database } from "../lib/firebase";

const onChangeHandler = (value: any, path: string, context: any) => {
  const member = path.split(".")[1];
  if (!context.initial) {
    update(ref(database), {
      [`/team/${member}`]: {
        animation: value,
      },
    });
  }
};

export default function useAnimationsDatabase({ collapsed, render = false }: { collapsed: boolean; render?: boolean }) {
  const [animations, set] = useControls(
    "Animations",
    () => ({
      Baptiste: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Thibault: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Han: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Quentin: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Laureen: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Hugo: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Ariel: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Colin: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Vincent: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
      Lucie: {
        options: ANIMATIONS,
        onChange: onChangeHandler,
        transient: false,
      },
    }),
    { collapsed, render: () => render }
  );

  // useControls("Choreography", () => ({
  //   Team: {
  //     options: ANIMATIONS,
  //     onChange: (value: any, path: string, context: any) => {
  //       if (!context.initial) {
  //         let newState: object = {};
  //         let newDBState: object = {};

  //         MEMBERS.forEach((member) => {
  //           newState = {
  //             ...newState,
  //             [member]: value,
  //           };
  //           newDBState = {
  //             ...newDBState,
  //             [`team/${member}`]: { animation: value },
  //           };
  //         });
  //         set(newState);
  //         update(ref(database), newState);
  //       }
  //     },
  //     transient: false,
  //   },
  // }));

  // Set local state from firebase
  useEffect(() => {
    const team = ref(database, "team");

    return onValue(team, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.entries(data).map(([member, value]) => {
          // @ts-expect-error
          set({ [member]: value.animation });
        });
      }
    });
  }, []);

  return { animations, set };
}
