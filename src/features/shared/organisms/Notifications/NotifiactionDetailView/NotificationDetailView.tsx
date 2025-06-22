import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import { useNavigation } from '@react-navigation/native';

interface NotificationDetailViewProps {
  notificationId: string;
}

export default function NotificationDetailView({ notificationId }: NotificationDetailViewProps) {
  const navigation = useNavigation();

  const handleMarkAsRead = () => {
    Alert.alert('Notificación', `Notificación ${notificationId} marcada como leída.`);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ProfileHeader name={`Notificación ID: ${notificationId}`} imageUri={''} onBack={handleBack} />
      <Text>Detalles de la notificación {notificationId}</Text>

      <Button onClick={handleMarkAsRead}>
        <Text>Marcar como leída</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
});