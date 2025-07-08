import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from '../../atoms/Avatar/Avatar';
import Text from '../../atoms/Text/Text';
import { ProfileHeaderProps } from './types/types';

export default function ProfileHeader({ name, imageUri, onBack, style }: ProfileHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      )}
      <Avatar imageUri={imageUri} initials={name[0]} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#E6E6E6',
    padding: 8,
    borderRadius: 100,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#6750A4',
  },
});