import { useGalleryStore } from "../Store";

export const Cube = () => {
  const { primaryColor } = useGalleryStore((state) => ({
    primaryColor: state.primaryColor,
  }));
  return <div>Hello {primaryColor} Cube</div>;
};

export const CubeEditor = () => {
  return (
    <div>
      <Cube />
      Controls
    </div>
  );
};

export const CubeGadget = {
  gadget: <Cube />,
  editor: <CubeEditor />,
};
