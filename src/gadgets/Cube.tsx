import { Button } from "@mantine/core";
import { Canvas, useThree } from "@react-three/fiber";
import { useGalleryStore } from "../Store";

interface ICubeProps {
  primaryColor: string;
}

interface ICubeEditorProps {
  primaryColor: string;
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
  return (
    <Canvas>
      <CubeInternals primaryColor={primaryColor} />
    </Canvas>
  );
};

// export const Cube = ({ primaryColor }: ICubeProps) => {
//   const { setCanvasUrl } = useGalleryStore((state) => ({
//     setCanvasUrl: state.setCanvasUrl,
//   }));
//   useThree((state) => {
//     setCanvasUrl(
//       state.gl.domElement
//         .toDataURL("image/png")
//         .replace("image/png", "image/octet-stream")
//     );
//   });
//   return (
//     <div>
//       <ambientLight intensity={Math.PI / 2} />
//       <spotLight
//         position={[10, 10, 10]}
//         angle={0.15}
//         penumbra={1}
//         decay={0}
//         intensity={Math.PI}
//       />
//       <mesh scale={2} rotation={[Math.PI / 2, 1, 1]}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color={primaryColor} />
//       </mesh>
//     </div>
//   );
// };

const DownloadableCube = ({ primaryColor }: ICubeProps) => {
  const { setCanvasUrl } = useGalleryStore((state) => ({
    setCanvasUrl: state.setCanvasUrl,
  }));
  useThree((state) => {
    setCanvasUrl(
      state.gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    );
  });
  return <CubeInternals primaryColor={primaryColor} />;
};

export const CubeEditor = ({ primaryColor }: ICubeEditorProps) => {
  const { canvasUrl } = useGalleryStore((state) => ({
    canvasUrl: state.canvasUrl,
  }));
  return (
    <div>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <DownloadableCube primaryColor={primaryColor} />
      </Canvas>
      Controls
      {canvasUrl && (
        <Button
          onClick={() => {
            const link = document.createElement("a");
            link.setAttribute("download", "canvas.png");
            link.setAttribute("href", canvasUrl);
            link.click();
          }}
        >
          Download
        </Button>
      )}
    </div>
  );
};
