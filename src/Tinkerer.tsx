import { Paper, Text, Title } from "@mantine/core";
import { useGalleryStore } from "./Store";
import { editorFactory } from "./GadgetFactory";

const Tinkerer = () => {
  const { selectedGadget, primaryColor } = useGalleryStore((state) => ({
    selectedGadget: state.selectedGadget,
    primaryColor: state.primaryColor,
  }));

  return (
    <Paper style={{ height: "100%" }}>
      <Paper
        shadow="sm"
        p="lg"
        mb="ms"
        mx="ms"
        mt="ms"
        // style={{ height: "40%" }}
      >
        <Text size="xl">Tinkerer</Text>
        {selectedGadget && editorFactory(selectedGadget, primaryColor)}
      </Paper>
    </Paper>
  );
};

export default Tinkerer;
