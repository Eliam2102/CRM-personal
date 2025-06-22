import { StyleSheet, View } from "react-native";
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
        <Text style={styles.nameText}>{name}</Text>
      </View>

      <Button onClick={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Ver</Text>
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    maxWidth: '70%',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});