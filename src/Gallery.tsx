import { ColorInput, Grid, SimpleGrid, Title } from "@mantine/core";
import GadgetCard from "./GadgetCard";
import { useEffect, useState } from "react";
import { GadgetLibrary } from "./GadgetLibrary";
import { useGalleryStore } from "./Store";
import { gadgetFactory } from "./GadgetFactory";

function Gallery() {
  const [gadgets, setGadgets] = useState<JSX.Element[]>([]);

  const { primaryColor, setPrimaryColor } = useGalleryStore((state) => ({
    primaryColor: state.primaryColor,
    setPrimaryColor: state.setPrimaryColor,
  }));

  useEffect(() => {
    const gadgetCards = GadgetLibrary.map((g) => (
      <GadgetCard>{gadgetFactory(g.id, primaryColor)}</GadgetCard>
    ));
    setGadgets(gadgetCards);
  }, [primaryColor]);

  return (
    <Grid>
      <Grid.Col span={8}>
        <Title order={1}>gadgeteer</Title>
        <ColorInput
          format="hex"
          swatches={["#2e2e2e", "#868e96", "#fa5252"]}
          onChange={(color) => setPrimaryColor(color)}
        />
        <SimpleGrid spacing="xl" cols={5}>
          {gadgets}
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
}

export default Gallery;
