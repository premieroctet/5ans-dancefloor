---
theme: default
_class: lead
paginate: true
backgroundColor: rgb(241, 242, 255)
marp: true
footer: <img src="logo.png" width="120" id="logo" />
style: |
  section {
    background: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: black;
    border-bottom: 10px solid #5057f2;
  }
  h1, h2 {
    color: black;
    font-weight: 700;
  }
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 2em;
  }
  code {
    background: white;
  }
  pre {
    background: white;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  ul li {
    position: relative;
    padding-left: 1.5em;
    margin-bottom: 0.5em;
    line-height: 1.6;
  }
  ul li:before {
    content: "•";
    color: #5057f2;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
  a {
    color: #5057f2;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  strong {
    color: #5057f2;
  }
  footer {
    color: #666;
  }
  #logo {
    position: relative;
    z-index: 0;
  }
  marp-pre {
    position: relative;
    z-index: 1;
  }
  .columns {
    display: flex;
    gap: 2em;
  }
  .columns > div {
    flex: 1;
  }
---

# LT : comment j'ai fait twerker mes collègues sur un dancefloor avec React

![bg opacity:.6](images/intro.png)

---

## Contexte

**5 ans** de Premier Octet

Grosse soirée avec plusieurs activités et ambiance

Concert des Daft Punk (les faux), Photobooth, dancefloor

![bg contain right](https://multipass.premieroctet.com/_next/image?url=%2Flogo.jpg&w=1200&q=75)

---

## Recherche

- Comment **modéliser** en 3D mes collègues ?
- Comment les **animer** ?
- Comment permettre le **contrôle** des animations en temps réel ?

---

## Stack Technique

- React + [Three.js](https://threejs.org/) ([react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction))
- Vite
- TypeScript
- Firebase Realtime Database

---

## Modélisation

[Avaturn](https://avaturn.me) pour la création des modèles 3D

- Avatar 3D personnalisé
- Généré à partir de 3 photos
- Export en format GLB compatible Three.js

![bg right](images/avaturn.png)

---

## Architecture React

```tsx
// App.tsx - Structure principale
<Canvas camera={{ fov: 30 }}>
  <Suspense fallback={null}>
    {MEMBERS.map((member, index) => (
      <Avatar model={member} animation={animations[member]} position={positions[member]} />
    ))}
    <Scene />
    <DiscoBall />
    <Stars />
  </Suspense>
</Canvas>
```

---

## Modélisation Three.js

```tsx
export default function Avatar({ model, animation = "silly-dancing", index, ...props }: AvatarProps) {
  const obj = useLoader(GLTFLoader, `models/${model}.glb`);
  const animationObject = useLoader(FBXLoader, `animations/${animation}.fbx`);
  const { ref, actions, names } = useAnimations(animationObject.animations);

  useEffect(() => {
    actions[names[0]]?.play();
  }, [animation]);

  return (
    <group {...props} ref={ref} rotation-y={Math.PI * index * 0.1}>
      <primitive object={obj.scene} />
    </group>
  );
}
```

---

<div class="columns">

<div>

## Animation

[Mixamo](https://www.mixamo.com) pour les animations

- Bibliothèque d'animations par Adobe
- Export FBX
- Animations fluides et naturelles
- Intégrable avec Three.js

</div>

<div>
  <video src="videos/mixamo.webm" width="100%" height="100%" autoplay muted loop></video>
</div>

</div>

---

## Contrôles

- Debug avec [Leva](https://github.com/pmndrs/leva)
- Contrôle individuel des animations
- Persistence et temps réel avec Firebase
- URL params pour customisation si nécessaire pendant la soirée

  ```
  ?dancefloor&autoRotateSpeed=0.1
  ```

![bg 50% right](images/leva.png)

---

## Gestion des animations (1/2)

```tsx
import { onValue, ref, update } from "firebase/database";
import { useControls } from "leva";

const [animations, set] = useControls("Animations", {
  Baptiste: { options: ANIMATIONS },
  Thibault: { options: ANIMATIONS },
  // ...
});
```

---

## Gestion des animations (2/2)

```tsx
import { onValue, ref, update } from "firebase/database";

// Synchronisation Firebase
useEffect(() => {
  const team = ref(database, "team");

  return onValue(team, (snapshot) => {
    const data = snapshot.val();
    if (snapshot.exists()) {
      Object.entries(data).map(([member, value]) => {
        set({ [member]: value.animation });
      });
    }
  });
}, []);
```

---

## Mise en Scène

Éléments visuels :

- Boule disco rotative, fichier 3D sur [sketchfab.com](https://sketchfab.com)

[@react-three/drei](https://github.com/pmndrs/drei) :

- Éclairage dynamique `<Stage />`
- Fond étoilé avec `<Stars />`
- Caméra orbitale avec auto-rotation `<OrbitControls />`

---

## Démo

[premieroctet.com/dancefloor](https://www.premieroctet.com/dancefloor)

---

<style scoped>
section {
  padding: 0;
  margin: 0;
}
</style>

<iframe src="https://www.premieroctet.com/dancefloor" width="100%" height="100%"></iframe>

---

<style scoped>
section {
  padding: 0;
  margin: 0;
}
</style>

<iframe src="https://premieroctet.github.io/5ans-dancefloor/#/config" width="100%" height="100%"></iframe>

---

## Merci

![bg opacity:.6 blur:1px](images/end.png)

