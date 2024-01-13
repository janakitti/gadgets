import { Grid, Title } from "@mantine/core";

function Gallery() {
  return (
    <Grid>
      <Grid.Col span={9}>
        <Title order={1}>gadgeteer</Title>
      </Grid.Col>
      <Grid.Col span={9}></Grid.Col>
    </Grid>
  );
}

export default Gallery;
