import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNotificationsParamsList } from '../../../navigation/Notifications/types/types';
import NotificationDetailView from '../../shared/organisms/Notifications/NotifiactionDetailView/NotificationDetailView';

type NotificationDetailRouteProp = RouteProp<StackNotificationsParamsList, 'notificationDetail'>;

export default function NotificationDetailScreen() {
  // Obtenemos el id desde la ruta
  const route = useRoute<NotificationDetailRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <NotificationDetailView notificationId={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});