import { Cube } from "./gadgets/Cube";

export const gadgetFactory = (id: string, primaryColor: string) => {
  if (id === "cube") {
    return <Cube primaryColor={primaryColor} />;
  }
  return <Cube primaryColor={primaryColor} />;
};
