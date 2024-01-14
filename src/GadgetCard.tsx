import { Card, Image, Text } from "@mantine/core";
import React from "react";

interface IGadgetCardProps {
  //   display: JSX.Element;
  //   primaryColor: string;
  children: React.ReactElement;
}

const GadgetCard = ({ children }: IGadgetCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {/* <Image src="temp_img.png" width={40} alt="alt" /> */}
        {children}
      </Card.Section>
      <Text size="sm" c="dimmed">
        Alarm Clock
      </Text>
    </Card>
  );
};

export default GadgetCard;
