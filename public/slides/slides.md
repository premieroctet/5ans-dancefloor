---
theme: default
_class: lead
paginate: true
backgroundColor: #fff
---

<style>
section {
  background: yellow;
}
</style>

# LT : comment j'ai fait twerker mes collègues sur un dancefloor avec React

---

## Contexte

5 ans de Premier Octet

Grosse soirée avec activités et ambiance

---

## Recherche

- Comment modéliser mes collègues ?
- Comment les animer ?
- Comment permettre le contrôle des animations en temps réel ?

---

## Stack Technique

- React + Three.js (react-three/fiber)
- Firebase Realtime Database
- Vite
- TypeScript

---

## Modélisation

Avaturn pour la création des modèles 3D

Avantages :

- Création rapide d'avatars personnalisés
- Export en format GLB compatible Three.js
- Résultats réalistes

---

## Architecture React

```tsx
// App.tsx - Structure principale
<Canvas camera={{ fov: 30 }}>
  <Suspense fallback={null}>
    {MEMBERS.map((member, index) => (
      <Avatar model={member.toLowerCase()} animation={animations[member]} position={positions[member]} />
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

## Animation

Mixamo pour les animations

Caractéristiques :

- Bibliothèque riche d'animations
- Format FBX compatible
- Animations fluides et naturelles
- Facile à intégrer avec Three.js

---

## Gestion des Animations en Temps Réel

```typescript
export default function useAnimationsDatabase() {
  // Interface de contrôle pour chaque membre
  const [animations, set] = useControls("Animations", {
    Baptiste: { options: ANIMATIONS },
    // ...
  });

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

  return { animations, set };
}
```

---

## Contrôles

Firebase + UI config avec Leva

Features :

- Contrôle individuel des animations
- Synchronisation en temps réel
- Interface utilisateur intuitive
- Persistance des états

---

## Mise en Scène

Éléments visuels :

- Éclairage dynamique avec HDR (venice_sunset)
- Boule disco rotative
- Fond étoilé avec `<Stars />`
- Caméra orbitale avec auto-rotation

---

## Démo

[premieroctet.com/dancefloor](https://www.premieroctet.com/dancefloor)

Features démo :

- URL params pour customisation
  - ?dancefloor - Active le dancefloor
  - ?autoRotateSpeed - Vitesse de rotation

---

<style scoped>
section {
  padding: 0;
  margin: 0;
}
</style>

<iframe src="https://www.premieroctet.com/dancefloor" width="100%" height="100%"></iframe>
