import { Euler, Vector3 } from "three";

interface ICylinderProps {
  scale?: number;
  position?: Vector3;
  rotation?: number[];
  radiusTop?: number;
  radiusBottom?: number;
  height?: number;
  radialSegments?: number;
  isOpenEnded?: boolean;
  color?: string;
}

export const Cylinder = ({
  scale = 1,
  position = new Vector3(),
  rotation = [0, 0, 0],
  radiusTop = 1,
  radiusBottom = 1,
  height = 1,
  radialSegments = 32,
  isOpenEnded = false,
  color = "#FFFFFF",
}: ICylinderProps) => {
  return (
    <group scale={scale} position={position} rotation={new Euler(...rotation)}>
      <mesh>
        <cylinderGeometry
          args={[
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            radialSegments,
            isOpenEnded,
          ]}
        />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};
