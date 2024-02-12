import { Clock, ClockEditor } from "./gadgets/Clock";
import { Cube, CubeEditor } from "./gadgets/Cube";
import { WaterGlass, WaterGlassEditor } from "./gadgets/WaterGlass";

export const gadgetFactory = (id: string, primaryColor: string) => {
  if (id === "cube") {
    return <Cube primaryColor={primaryColor} />;
  } else if (id === "clock") {
    return <Clock primaryColor={primaryColor} />;
  } else if (id === "water_glass") {
    return <WaterGlass primaryColor={primaryColor} />;
  }
  return <Cube primaryColor={primaryColor} />;
};

export const editorFactory = (id: string, primaryColor: string) => {
  if (id === "cube") {
    return <CubeEditor primaryColor={primaryColor} />;
  } else if (id === "clock") {
    return <ClockEditor primaryColor={primaryColor} />;
  } else if (id === "water_glass") {
    return <WaterGlassEditor primaryColor={primaryColor} />;
  }
  return <CubeEditor primaryColor={primaryColor} />;
};
