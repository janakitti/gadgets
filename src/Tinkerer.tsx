import { Paper, Title } from "@mantine/core";
import { useGalleryStore } from "./Store";
import { editorFactory } from "./GadgetFactory";

const Tinkerer = () => {
  const { selectedGadget, primaryColor } = useGalleryStore((state) => ({
    selectedGadget: state.selectedGadget,
    primaryColor: state.primaryColor,
  }));

  return (
    <Paper>
      <Title>Tinkerer</Title>
      {selectedGadget && editorFactory(selectedGadget, primaryColor)}
    </Paper>
  );
};

export default Tinkerer;
