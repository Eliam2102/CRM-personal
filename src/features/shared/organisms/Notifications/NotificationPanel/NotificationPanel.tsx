import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NotificationCard from '../../../molecules/Cards/NotificationCard/NotificationCard';
import { useNavigation } from '@react-navigation/native';
import { NotificationStackNavigationProp } from '../../../../../navigation/Notifications/types/types';

export interface NotificationType {
  id: string;
  title: string;
  description: string;
}

interface NotificationPanelProps {
  notifications: NotificationType[];
}

export default function NotificationPanel({ notifications }: NotificationPanelProps) {
  const navigation = useNavigation<NotificationStackNavigationProp >();

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard
            title={item.title}
            message={item.description}
            onPress={() => navigation.navigate('notificationDetail', { id: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  separator: {
    height: 12,
  },
});