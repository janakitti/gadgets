import { Button, Slider } from "@mantine/core";
import { Canvas, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

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
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <mesh scale={2} rotation={[Math.PI / 2, rotation, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={primaryColor} />
      </mesh>
    </>
  );
};

export const Cube = ({ primaryColor }: ICubeProps) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div ref={ref}>
      {inView && (
        <Canvas>
          <CubeInternals primaryColor={primaryColor} />
        </Canvas>
      )}
    </div>
  );
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
        <DownloadableCube
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
