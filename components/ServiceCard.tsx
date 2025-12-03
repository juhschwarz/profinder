
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Service } from '@/types/service';
import { i18n } from '@/locales/translations';

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
  onBook?: () => void;
}

export function ServiceCard({ service, onPress, onBook }: ServiceCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {service.imageUrl && (
        <Image source={{ uri: service.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {service.title}
          </Text>
          <View style={styles.badges}>
            {service.providerPremium && (
              <View style={[styles.badge, styles.premiumBadge]}>
                <IconSymbol
                  ios_icon_name="star.fill"
                  android_material_icon_name="star"
                  size={12}
                  color={colors.card}
                />
              </View>
            )}
            {service.providerVerified && (
              <View style={[styles.badge, styles.verifiedBadge]}>
                <IconSymbol
                  ios_icon_name="checkmark.seal.fill"
                  android_material_icon_name="verified"
                  size={12}
                  color={colors.card}
                />
              </View>
            )}
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.providerInfo}>
            <IconSymbol
              ios_icon_name="person.fill"
              android_material_icon_name="person"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={styles.providerName}>{service.providerName}</Text>
          </View>

          <View style={styles.rating}>
            <IconSymbol
              ios_icon_name="star.fill"
              android_material_icon_name="star"
              size={16}
              color={colors.highlight}
            />
            <Text style={styles.ratingText}>
              {service.rating.toFixed(1)} ({service.reviewCount})
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.location}>
            <IconSymbol
              ios_icon_name="location.fill"
              android_material_icon_name="location-on"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={styles.locationText}>{service.location}</Text>
          </View>
          <Text style={styles.price}>
            {service.price} {service.currency}
          </Text>
        </View>

        {onBook && (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={(e) => {
              e.stopPropagation();
              onBook();
            }}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="calendar"
              android_material_icon_name="calendar-today"
              size={18}
              color={colors.card}
            />
            <Text style={styles.bookButtonText}>{i18n.t('serviceCard.bookNow')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 4,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    backgroundColor: colors.highlight,
  },
  verifiedBadge: {
    backgroundColor: colors.success,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  providerName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.card,
  },
});
