import {
  ColorInput,
  Divider,
  Grid,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import GadgetCard from "./GadgetCard";
import { MutableRefObject, createRef, useState } from "react";
import { useGalleryStore } from "./Store";
import { gadgetFactory } from "./GadgetFactory";
import Tinkerer from "./Tinkerer";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";

function Gallery() {
  const [library, setLibrary] = useState<any[]>([
    {
      id: "cube",
      name: "Cube",
      phoneticName: "/kyo͞ob/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
    {
      id: "clock",
      name: "Clock",
      phoneticName: "/kläk/",
      ref: createRef() as MutableRefObject<HTMLDivElement>,
    },
  ]);

  const { primaryColor, selectedGadget, setPrimaryColor, setSelectedGadget } =
    useGalleryStore((state) => ({
      primaryColor: state.primaryColor,
      selectedGadget: state.selectedGadget,
      setPrimaryColor: state.setPrimaryColor,
      setSelectedGadget: state.setSelectedGadget,
    }));

  const jsxObjects = () => {
    return library.map((item, index) => (
      <group key={item.id} position={[index * 10, 0, 0]}>
        {gadgetFactory(item.id, primaryColor)}
      </group>
    ));
  };

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
        <SimpleGrid spacing="xl" verticalSpacing="xl" cols={4}>
          {library.map((item) => (
            <GadgetCard
              key={item.id}
              name={item.name}
              onClick={() => setSelectedGadget(item)}
            >
              <div
                ref={item.ref}
                style={{
                  height: "10em",
                  width: "100%",
                }}
              ></div>
            </GadgetCard>
          ))}
        </SimpleGrid>
        <Canvas
          style={{
            position: "fixed",
            left: "0",
            bottom: "0",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {library.map((item, index) => (
            <View index={index} key={item.id} track={item.ref}>
              <ambientLight intensity={Math.PI / 2} />
              {jsxObjects()}
              <PerspectiveCamera makeDefault position={[index * 10, 0, 6]} />
            </View>
          ))}
        </Canvas>
      </Grid.Col>
      <Grid.Col span={3} style={{ height: "100%" }}>
        {selectedGadget && <Tinkerer />}
      </Grid.Col>
      <Grid.Col span={1} style={{ height: "100%" }}></Grid.Col>
    </Grid>
  );
}

export default Gallery;
