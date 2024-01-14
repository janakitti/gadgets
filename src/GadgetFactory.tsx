import { Cube, CubeEditor } from "./gadgets/Cube";

export const gadgetFactory = (id: string, primaryColor: string) => {
  if (id === "cube") {
    return <Cube primaryColor={primaryColor} />;
  }
  return <Cube primaryColor={primaryColor} />;
};

export const editorFactory = (id: string, primaryColor: string) => {
  if (id === "cube") {
    return <CubeEditor primaryColor={primaryColor} />;
  }
  return <CubeEditor primaryColor={primaryColor} />;
};
