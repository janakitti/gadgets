import { Button, Slider, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { Canvas, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Euler, Matrix4, Quaternion, Vector2, Vector3 } from "three";
import { rotateAboutAnchor } from "../utils";
import "../tinkerer.css";
import { Cylinder } from "../shapes";

const FILENAME = "clock";

interface IClockProps {
  primaryColor: string;
  rotation?: number;
  hour?: number;
  minute?: number;
}

interface IClockEditorProps {
  primaryColor: string;
}

interface IDownloadHandle {
  download: () => void;
}

const ClockInternals = ({
  primaryColor,
  rotation,
  hour,
  minute,
}: IClockProps) => {
  if (!rotation) {
    rotation = 0;
  }
  if (!hour) {
    hour = 0;
  }
  if (!minute) {
    minute = 0;
  }
  console.log(minute);

  const { newPos: hourArmPos, newRot: hourArmRot } = rotateAboutAnchor(
    new Vector3(0, 0.3, 0.3),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    hour
  );

  const { newPos: minuteArmPos, newRot: minuteArmRot } = rotateAboutAnchor(
    new Vector3(0, 0.3, 0.3),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    minute
  );
  return (
    <>
      <group rotation={[0, rotation, 0]}>
        <Cylinder
          rotation={[Math.PI / 2, 0, 0]}
          radiusTop={1}
          radiusBottom={1}
          height={0.6}
          color={"#FFFFFF"}
        />

        <Cylinder
          rotation={[Math.PI / 2, 0, 0]}
          radiusTop={1.001}
          radiusBottom={1.001}
          height={0.6}
          isOpenEnded
          color={primaryColor}
        />

        <group scale={1} position={[0, 0, -0.301]} rotation={[0, Math.PI, 0]}>
          <mesh>
            <circleGeometry args={[1]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>

        <group scale={1} position={[0, 0, 0.3]} rotation={[0, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.9, 0.1]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>

        <group scale={1} position={[0, 0, -0.3]} rotation={[0, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.9, 0.1]} />
            <meshStandardMaterial color={primaryColor} />
          </mesh>
        </group>

        <group scale={1} position={[0, 0, 0.325]} rotation={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color={"#000000"} />
          </mesh>
        </group>

        <group scale={1} position={minuteArmPos} rotation={minuteArmRot}>
          <mesh>
            <capsuleGeometry args={[0.06, 0.6]} />
            <meshStandardMaterial color={"#000000"} />
          </mesh>
        </group>
        <group scale={1} position={hourArmPos} rotation={hourArmRot}>
          <mesh>
            <capsuleGeometry args={[0.06, 0.4]} />
            <meshStandardMaterial color={"#000000"} />
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
  return <ClockInternals primaryColor={primaryColor} />;
};

const DownloadableClock = forwardRef(
  ({ primaryColor, rotation, hour, minute }: IClockProps, ref) => {
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
      <ClockInternals
        primaryColor={primaryColor}
        rotation={rotation}
        hour={hour}
        minute={minute}
      />
    );
  }
);

const militaryTimeToRotations = (time: string) => {
  const [hour, minute]: string[] = time.split(":");

  const numericHour = Number(hour) % 12;
  const numericMinute = Number(minute);

  const hourRotation = -(numericHour / 12) * 2 * Math.PI;
  const minuteRotation = -(numericMinute / 60) * 2 * Math.PI;
  return { hourRotation, minuteRotation };
};

export const ClockEditor = ({ primaryColor }: IClockEditorProps) => {
  const childRef = useRef<IDownloadHandle>();
  const [rotation, setRotation] = useState(0);
  const [time, setTime] = useState("00:00");

  const clockRotation = rotation * 2 * Math.PI;
  const { hourRotation, minuteRotation } = militaryTimeToRotations(time);

  return (
    <div>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100%", aspectRatio: "1" }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <DownloadableClock
          ref={childRef}
          primaryColor={primaryColor}
          rotation={clockRotation}
          hour={hourRotation}
          minute={minuteRotation}
        />
      </Canvas>
      <div className="control-panel">
        <Button
          radius="xl"
          onClick={() => {
            if (childRef && childRef.current) {
              childRef.current.download();
            }
          }}
        >
          Download
        </Button>
        <Text size="sm">Rotation</Text>
        <Slider
          min={0}
          max={1}
          step={0.05}
          value={rotation}
          onChange={setRotation}
        />
        <TimeInput
          label="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
    </div>
  );
};
