import { Canvas } from "@react-three/fiber";

interface ICubeProps {
  primaryColor: string;
}

interface ICubeEditorProps {
  primaryColor: string;
}

export const Cube = ({ primaryColor }: ICubeProps) => {
  return (
    <div>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <mesh scale={2} rotation={[Math.PI / 2, 1, 1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>
      </Canvas>
    </div>
  );
};

export const CubeEditor = ({ primaryColor }: ICubeEditorProps) => {
  return (
    <div>
      <Cube primaryColor={primaryColor} />
      Controls
    </div>
  );
};
