import { Button, Slider, Text } from "@mantine/core";
import { Canvas, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ControlPanel from "../ControlPanel";

const FILENAME = "cube";

interface ICubeProps {
  primaryColor: string;
  rotation?: number;
}

interface ICubeEditorProps {
  primaryColor: string;
}

interface IDownloadHandle {
  download: () => void;
}

const CubeInternals = ({ primaryColor, rotation }: ICubeProps) => {
  if (!rotation) {
    rotation = 0;
  }
  return (
    <>
      <mesh scale={2} rotation={[Math.PI / 2, rotation, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={primaryColor} />
      </mesh>
    </>
  );
};

export const Cube = ({ primaryColor }: ICubeProps) => {
  return <CubeInternals primaryColor={primaryColor} />;
};

const DownloadableCube = forwardRef(
  ({ primaryColor, rotation }: ICubeProps, ref) => {
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

    return <CubeInternals primaryColor={primaryColor} rotation={rotation} />;
  }
);

export const CubeEditor = ({ primaryColor }: ICubeEditorProps) => {
  const childRef = useRef<IDownloadHandle>();
  const [rotation, setRotation] = useState(0);

  return (
    <div>
      <Canvas gl={{ preserveDrawingBuffer: true }} style={{ height: "50vh" }}>
        <ambientLight intensity={Math.PI / 2} />
        <DownloadableCube
          ref={childRef}
          primaryColor={primaryColor}
          rotation={rotation}
        />
      </Canvas>

      <ControlPanel
        onClick={() => {
          if (childRef && childRef.current) {
            childRef.current.download();
          }
        }}
      >
        <Text size="sm">Rotation</Text>
        <Slider
          min={0}
          max={1}
          step={0.001}
          value={rotation}
          onChange={setRotation}
        />
      </ControlPanel>
    </div>
  );
};
