import { Button, Slider, Text } from "@mantine/core";
import "./tinkerer.css";

interface IControlPanelProps {
  onClick: () => void;
  children: React.ReactElement[];
}

const ControlPanel = ({ onClick, children }: IControlPanelProps) => {
  return (
    <div className="control-panel">
      <Button radius="xl" onClick={onClick}>
        Download
      </Button>
      {children}
    </div>
  );
};

export default ControlPanel;
