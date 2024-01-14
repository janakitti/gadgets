import { useGalleryStore } from "../Store";

interface ICubeProps {
  primaryColor: string;
}

export const Cube = ({ primaryColor }: ICubeProps) => {
  return (
    <div style={{ height: "4em", width: "4em", background: primaryColor }}>
      Hello {primaryColor} Cube
    </div>
  );
};

export const CubeEditor = () => {
  const { primaryColor } = useGalleryStore((state) => ({
    primaryColor: state.primaryColor,
  }));
  return (
    <div>
      <Cube primaryColor={primaryColor} />
      Controls
    </div>
  );
};

// export const CubeGadget = {
//   gadget: <Cube />,
//   editor: <CubeEditor />,
// };
