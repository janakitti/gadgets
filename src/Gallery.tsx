import {
  ColorInput,
  Divider,
  Grid,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
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
      <GadgetCard key={g.id} name={g.name} onClick={() => setSelectedGadget(g)}>
        {gadgetFactory(g.id, primaryColor)}
      </GadgetCard>
    ));
    setGadgets(gadgetCards);
  }, [primaryColor, setSelectedGadget]);

  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Col span={1} style={{ height: "100%" }}></Grid.Col>
      <Grid.Col span={7} px="lg" style={{ height: "100%" }}>
        <Title order={1} my="xl">
          gadgeteer
        </Title>
        <Text size="md" my="xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Text>
        <Grid>
          <Grid.Col span={3}>
            <ColorInput
              format="hex"
              defaultValue={primaryColor}
              swatches={["#2e2e2e", "#868e96", "#fa5252"]}
              onChange={(color) => setPrimaryColor(color)}
              mt="md"
            />
          </Grid.Col>
          <Grid.Col span={9}></Grid.Col>
        </Grid>
        <Divider my="xl" />
        <SimpleGrid spacing="xl" verticalSpacing="xl" cols={2}>
          {gadgets}
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={3} style={{ height: "100%" }}>
        <Tinkerer />
      </Grid.Col>
      <Grid.Col span={1} style={{ height: "100%" }}></Grid.Col>
    </Grid>
  );
}

export default Gallery;
