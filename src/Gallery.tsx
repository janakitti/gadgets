import { Grid, SimpleGrid, Title } from "@mantine/core";
import GadgetCard from "./GadgetCard";

function Gallery() {
  return (
    <Grid>
      <Grid.Col span={8}>
        <Title order={1}>gadgeteer</Title>
        <SimpleGrid spacing="xl" cols={5}>
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
          <GadgetCard />
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
}

export default Gallery;
