import { Paper, Title } from "@mantine/core";
import { useGalleryStore } from "./Store";
import { editorFactory } from "./GadgetFactory";

const Tinkerer = () => {
  const { selectedGadget, primaryColor } = useGalleryStore((state) => ({
    selectedGadget: state.selectedGadget,
    primaryColor: state.primaryColor,
  }));

  return (
    <Paper style={{ height: "100%" }}>
      <Title>Tinkerer</Title>
      <Paper
        shadow="sm"
        px="xs"
        mb="ms"
        mx="ms"
        mt="ms"
        // style={{ height: "40%" }}
      >
        {selectedGadget && editorFactory(selectedGadget, primaryColor)}
      </Paper>
    </Paper>
  );
};

export default Tinkerer;
