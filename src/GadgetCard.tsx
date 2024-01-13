import { Card, Image, Text } from "@mantine/core";

function GadgetCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src="temp_img.png" width={40} alt="alt" />
      </Card.Section>
      <Text size="sm" c="dimmed">
        Alarm Clock
      </Text>
    </Card>
  );
}

export default GadgetCard;
