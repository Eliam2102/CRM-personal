import { StyleSheet, ViewStyle, View } from "react-native";
import Card from "../../../atoms/Card/Card";
import Avatar from "../../../atoms/Avatar/Avatar";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import { ContactCardProps } from "../types/ContactCard";

export default function ContactCard({ name, imageUri, onPress }: ContactCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Avatar imageUri={imageUri} initials={name[0]} />
        <Text>{name}</Text>
      </View>
      <Button onClick={onPress}>
        <Text>Ver</Text>
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});