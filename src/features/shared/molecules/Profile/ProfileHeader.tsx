import React from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from '../../atoms/Avatar/Avatar';
import Text from '../../atoms/Text/Text';
import Button from '../../atoms/Button/Button';
import { ProfileHeaderProps } from './types/types';

export default function ProfileHeader({ name, imageUri, onBack, style }: ProfileHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {onBack && (
        <Button onClick={onBack}>
          <Text>Volver</Text>
        </Button>
      )}
      <Avatar imageUri={imageUri} initials={name[0]} style={styles.avatar} />
      {/* <Text style={styles.name}>{name}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#6750A4',
  }
});