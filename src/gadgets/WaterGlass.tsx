import { Button, Slider, Text } from "@mantine/core";
import { Canvas, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ControlPanel from "../ControlPanel";
import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";

const FILENAME = "WaterGlass";

interface IWaterGlassProps {
  primaryColor: string;
  rotation?: number;
  fill?: number;
}

interface IWaterGlassEditorProps {
  primaryColor: string;
}

interface IDownloadHandle {
  download: () => void;
}

const WaterGlassInternals = ({
  primaryColor,
  rotation,
  fill,
}: IWaterGlassProps) => {
  if (!rotation) {
    rotation = 0;
  }
  if (fill === undefined) {
    fill = 0.5;
  }
  return (
    <>
      <group scale={2} rotation={[Math.PI / 6, 0, 0]}>
        <group position={[0, 2, 1]}>
          <pointLight args={["#FF0000", 10, 1, 1]} />
        </group>
        <group scale={1} position={[0, 0.15, 0]}>
          <mesh>
            <Geometry>
              <Base>
                <cylinderGeometry args={[0.4, 0.3, 1]} />
              </Base>
              <Subtraction position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.35, 0.25, 1]} />
              </Subtraction>
            </Geometry>
            <meshPhysicalMaterial
              color={"#CCDDFF"}
              thickness={0.5}
              roughness={0}
              transmission={1}
              clearcoat={1}
              envMapIntensity={0.8}
            />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <Geometry>
              <Base>
                <cylinderGeometry args={[0.35, 0.25, 1]} />
              </Base>
              <Subtraction position={[0, fill, 0]}>
                <cylinderGeometry args={[1, 1, 1.2]} />
              </Subtraction>
            </Geometry>
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export const WaterGlass = ({ primaryColor }: IWaterGlassProps) => {
  return <WaterGlassInternals primaryColor={primaryColor} />;
};

const DownloadableWaterGlass = forwardRef(
  ({ primaryColor, rotation, fill }: IWaterGlassProps, ref) => {
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

    return (
      <WaterGlassInternals
        primaryColor={primaryColor}
        rotation={rotation}
        fill={fill}
      />
    );
  }
);

export const WaterGlassEditor = ({ primaryColor }: IWaterGlassEditorProps) => {
  const childRef = useRef<IDownloadHandle>();
  const [rotation, setRotation] = useState(0);
  const [fill, setFill] = useState(0.5);

  return (
    <div>
      <Canvas gl={{ preserveDrawingBuffer: true }} style={{ height: "50vh" }}>
        <ambientLight intensity={Math.PI / 2} />
        <DownloadableWaterGlass
          ref={childRef}
          primaryColor={primaryColor}
          rotation={rotation}
          fill={fill}
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
        <Text size="sm">Fill</Text>
        <Slider min={0} max={1} step={0.001} value={fill} onChange={setFill} />
      </ControlPanel>
    </div>
  );
};
