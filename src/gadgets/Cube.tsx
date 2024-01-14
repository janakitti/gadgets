import { Button } from "@mantine/core";
import { Canvas, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useInView } from "react-intersection-observer";

const FILENAME = "cube";

interface ICubeProps {
  primaryColor: string;
}

interface ICubeEditorProps {
  primaryColor: string;
}

interface IDownloadHandle {
  download: () => void;
}

const CubeInternals = ({ primaryColor }: ICubeProps) => {
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
      <mesh scale={2} rotation={[Math.PI / 2, 1, 1]}>
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

const DownloadableCube = forwardRef(({ primaryColor }: ICubeProps, ref) => {
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

  return <CubeInternals primaryColor={primaryColor} />;
});

export const CubeEditor = ({ primaryColor }: ICubeEditorProps) => {
  const childRef = useRef<IDownloadHandle>();

  return (
    <div>
      <Canvas gl={{ preserveDrawingBuffer: true }} style={{ height: "50vh" }}>
        <DownloadableCube ref={childRef} primaryColor={primaryColor} />
      </Canvas>
      Controls
      <Button
        onClick={() => {
          if (childRef && childRef.current) {
            childRef.current.download();
          }
        }}
      >
        Download
      </Button>
    </div>
  );
};
