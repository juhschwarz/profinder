
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export function Logo({ size = 'medium', showText = true }: LogoProps) {
  const dimensions = {
    small: { icon: 24, text: 18 },
    medium: { icon: 40, text: 28 },
    large: { icon: 64, text: 42 },
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.iconContainer,
        { 
          width: dimensions[size].icon * 1.5,
          height: dimensions[size].icon * 1.5,
          borderRadius: dimensions[size].icon * 0.75,
        }
      ]}>
        <IconSymbol
          ios_icon_name="person.2.fill"
          android_material_icon_name="people"
          size={dimensions[size].icon}
          color={colors.card}
        />
      </View>
      {showText && (
        <Text style={[styles.text, { fontSize: dimensions[size].text }]}>
          Pro<Text style={styles.textAccent}>finder</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(63, 81, 181, 0.3)',
    elevation: 4,
  },
  text: {
    fontWeight: '700',
    color: colors.text,
  },
  textAccent: {
    color: colors.secondary,
  },
});
