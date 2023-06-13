import useAnimationsDatabase from "../hooks/useAnimationsDatabase";
import { ANIMATIONS } from "../lib/animations";
import "./Config.css";

export default function Config() {
  const { animations, set } = useAnimationsDatabase({ collapsed: false, render: false });

  return (
    <ul>
      {Object.entries(animations).map(([member, animation]) => {
        return (
          <li key={member}>
            <img src={`avatars/${member}.png`} />
            <section>
              <h2>{member}</h2>
              <select value={animation} onChange={(e) => set({ [member]: e.target.value })}>
                {ANIMATIONS.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </section>
          </li>
        );
      })}
    </ul>
  );
}
