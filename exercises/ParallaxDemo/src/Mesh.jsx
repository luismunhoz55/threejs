import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Mesh() {
  const meshRef = useRef();
  const meshRef1 = useRef();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const cursor = {};
  cursor.x = 0;
  cursor.y = 0;

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  });

  useFrame((state, delta) => {
    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;

    meshRef.current.rotation.x +=
      (parallaxY - meshRef.current.rotation.x) * 5 * delta;
    meshRef.current.rotation.y +=
      (-parallaxX - meshRef.current.rotation.y) * 5 * delta;

    meshRef1.current.rotation.x +=
      (parallaxY - meshRef1.current.rotation.x) * 3 * delta;
    meshRef1.current.rotation.y +=
      (-parallaxX - meshRef1.current.rotation.y) * 3 * delta;

    state.camera.position.x +=
      (parallaxX - state.camera.position.x) * 5 * delta;
    state.camera.position.y +=
      (parallaxY - state.camera.position.y) * 5 * delta;
  });

  return (
    <>
      <ambientLight />
      <directionalLight position-x={2} position-z={2} />
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshStandardMaterial color={0x00ffff} />
      </mesh>
      <mesh
        ref={meshRef1}
        position={[0, 0, -4]}
        scale={[3, 3, 3]}
        visible={false}
      >
        <boxGeometry />
        <meshStandardMaterial color={0x0000ff} />
      </mesh>
    </>
  );
}
