
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { ServiceCategory } from '@/types/service';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { i18n } from '@/locales/translations';

interface CategoryCardProps {
  category: ServiceCategory;
  onPress: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <IconSymbol
          ios_icon_name={category.icon}
          android_material_icon_name={category.icon as keyof typeof MaterialIcons.glyphMap}
          size={32}
          color={colors.primary}
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {category.name}
      </Text>
      <Text style={styles.count}>{category.count} {i18n.t('home.services')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 110,
    marginRight: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
