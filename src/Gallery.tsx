import { Grid, SimpleGrid, Title } from "@mantine/core";
import GadgetCard from "./GadgetCard";
import { useEffect, useState } from "react";
import { Gadget } from "./interfaces";
import { GadgetLibrary } from "./GadgetLibrary";

function Gallery() {
  const [gadgets, setGadgets] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const gadgetCards = GadgetLibrary.map((g) => g.gadget);
    setGadgets(gadgetCards);
  }, []);

  return (
    <Grid>
      <Grid.Col span={8}>
        <Title order={1}>gadgeteer</Title>
        <SimpleGrid spacing="xl" cols={5}>
          {gadgets}
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
}

export default Gallery;
