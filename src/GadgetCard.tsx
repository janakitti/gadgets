import { Card, Text } from "@mantine/core";
import React from "react";

interface IGadgetCardProps {
  onClick: () => void;
  children: React.ReactElement;
}

const GadgetCard = ({ onClick, children }: IGadgetCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <Card.Section>{children}</Card.Section>
      <Text size="sm" c="dimmed">
        Alarm Clock
      </Text>
    </Card>
  );
};

export default GadgetCard;
