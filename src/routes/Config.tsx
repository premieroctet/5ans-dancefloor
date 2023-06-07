import useAnimationsDatabase from "../hooks/useAnimationsDatabase";

export default function Config() {
  useAnimationsDatabase({ collapsed: false });

  return (
    <div>
      <p>Config</p>
    </div>
  );
}
