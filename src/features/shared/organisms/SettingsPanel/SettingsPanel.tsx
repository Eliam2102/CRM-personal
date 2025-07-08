import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import Text from '../../atoms/Text/Text';
import { useThemeStore } from '../../../../store/theme/themeStore';
import Icon from 'react-native-vector-icons/Feather';

export default function SettingsPanel() {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f9f9f9' }]}>

      <View style={styles.optionRow}>
        <View style={styles.iconLabel}>
          <Icon
            name={isDarkMode ? 'moon' : 'sun'}
            size={24}
            color={isDarkMode ? '#fff' : '#333'}
            style={styles.icon}
          />
          <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>
            {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
          </Text>
        </View>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
