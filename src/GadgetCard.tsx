import { Card, Text } from "@mantine/core";
import React from "react";

interface IGadgetCardProps {
  name: string;
  onClick: () => void;
  children: React.ReactElement;
}

const GadgetCard = ({ name, onClick, children }: IGadgetCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <Card.Section>{children}</Card.Section>
      <Text size="sm" c="dimmed">
        {name}
      </Text>
    </Card>
  );
};

export default GadgetCard;
