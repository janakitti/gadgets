import { ColorInput, Grid, SimpleGrid, Title } from "@mantine/core";
import GadgetCard from "./GadgetCard";
import { useEffect, useState } from "react";
import { GadgetLibrary } from "./GadgetLibrary";
import { useGalleryStore } from "./Store";
import { gadgetFactory } from "./GadgetFactory";
import Tinkerer from "./Tinkerer";

function Gallery() {
  const [gadgets, setGadgets] = useState<JSX.Element[]>([]);

  const { primaryColor, setPrimaryColor, setSelectedGadget } = useGalleryStore(
    (state) => ({
      primaryColor: state.primaryColor,
      setPrimaryColor: state.setPrimaryColor,
      setSelectedGadget: state.setSelectedGadget,
    })
  );

  useEffect(() => {
    const gadgetCards = GadgetLibrary.map((g) => (
      <GadgetCard key={g.id} onClick={() => setSelectedGadget(g.id)}>
        {gadgetFactory(g.id, primaryColor)}
      </GadgetCard>
    ));
    setGadgets(gadgetCards);
  }, [primaryColor, setSelectedGadget]);

  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Col span={8} style={{ height: "100%" }}>
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
      <Grid.Col span={4} style={{ height: "100%" }}>
        <Tinkerer />
      </Grid.Col>
    </Grid>
  );
}

export default Gallery;
