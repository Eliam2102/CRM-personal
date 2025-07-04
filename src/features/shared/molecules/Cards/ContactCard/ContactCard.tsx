import { StyleSheet, View } from "react-native";
import Card from "../../../atoms/Card/Card";
import Avatar from "../../../atoms/Avatar/Avatar";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import { ContactCardProps } from "../types/ContactCard";
import { useTheme } from "../../../../../common/hooks/theme";

export default function ContactCard({ name, imageUri, onPress }: ContactCardProps) {
  const theme = useTheme();
  return (
    <Card style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={styles.row}>
        <Avatar imageUri={imageUri} initials={name[0]} />

        <View style={styles.infoContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.nameText, { color: theme.onSurface }]}
          >
            {name}
          </Text>
          <Button
            onClick={onPress}
            style={[styles.button, { backgroundColor: theme.primary }]}
          >
            <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
              Ver contacto
            </Text>
          </Button>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    maxWidth: '100%',
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});