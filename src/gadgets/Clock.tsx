import { Button, Slider } from "@mantine/core";
import { Canvas, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";

const FILENAME = "clock";

interface IClockProps {
  primaryColor: string;
  rotation?: number;
}

interface IClockEditorProps {
  primaryColor: string;
}

interface IDownloadHandle {
  download: () => void;
}

const rotateAboutAnchor = (
  position: Vector3,
  initRotation: Vector3,
  anchor: Vector3,
  rotation: number
) => {
  let anchorShiftMatrix = new Matrix4().setPosition(anchor);
  anchor.negate();
  let negatedAnchorShiftMatrix = new Matrix4().setPosition(anchor);
  let rotateMatrix = new Matrix4().makeRotationZ(rotation);
  let positionMatrix = new Matrix4().setPosition(position);

  const finalMatrix = anchorShiftMatrix
    .multiply(rotateMatrix)
    .multiply(negatedAnchorShiftMatrix)
    .multiply(positionMatrix);

  const newPos = new Vector3();
  const newRotQuat = new Quaternion();

  anchorShiftMatrix.decompose(newPos, newRotQuat, new Vector3());

  const newRot = new Euler();
  newRot.setFromQuaternion(newRotQuat);
  return { newPos, newRot };
};

const ClockInternals = ({ primaryColor, rotation }: IClockProps) => {
  if (!rotation) {
    rotation = 0;
  }
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <group rotation={[0, 0, 0]}>
        <group scale={1} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[1, 1, 0.4]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>

        <group scale={1} position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
          <mesh>
            <torusGeometry args={[1, 0.1]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>

        <group scale={1} position={[0, 0.3, 0.4]} rotation={[0, 0, 0]}>
          <mesh>
            <capsuleGeometry args={[0.06, 0.6]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>
        <group
          scale={1}
          position={
            rotateAboutAnchor(
              new Vector3(0, 0.3, 0.4),
              new Vector3(0, 0, 0),
              new Vector3(0, 0, 0),
              rotation
            ).newPos
          }
          rotation={
            rotateAboutAnchor(
              new Vector3(0, 0.3, 0.4),
              new Vector3(0, 0, 0),
              new Vector3(0, 0, 0),
              rotation
            ).newRot
          }
        >
          <mesh>
            <capsuleGeometry args={[0.06, 0.4]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export const Clock = ({ primaryColor }: IClockProps) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div ref={ref}>
      {inView && (
        <Canvas>
          <ClockInternals primaryColor={primaryColor} />
        </Canvas>
      )}
    </div>
  );
};

const DownloadableClock = forwardRef(
  ({ primaryColor, rotation }: IClockProps, ref) => {
    const gl = useThree((state) => state.gl);

    useImperativeHandle(ref, () => ({
      download() {
        const link = document.createElement("a");
        link.setAttribute("download", `${FILENAME}.png`);
        link.setAttribute(
          "href",
          gl.domElement
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        );
        link.click();
      },
    }));

    return <ClockInternals primaryColor={primaryColor} rotation={rotation} />;
  }
);

export const ClockEditor = ({ primaryColor }: IClockEditorProps) => {
  const childRef = useRef<IDownloadHandle>();
  const [rotation, setRotation] = useState(0);

  return (
    <div>
      <Canvas gl={{ preserveDrawingBuffer: true }} style={{ height: "50vh" }}>
        <DownloadableClock
          ref={childRef}
          primaryColor={primaryColor}
          rotation={rotation}
        />
      </Canvas>
      <Button
        onClick={() => {
          if (childRef && childRef.current) {
            childRef.current.download();
          }
        }}
      >
        Download
      </Button>
      <Slider
        min={0}
        max={10}
        step={0.05}
        value={rotation}
        onChange={setRotation}
      />
    </div>
  );
};
