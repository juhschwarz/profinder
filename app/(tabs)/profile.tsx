
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { currentUser } from '@/data/mockData';
import { i18n } from '@/locales/translations';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const daysUntilExpiry = currentUser.premiumExpiryDate
    ? Math.ceil((new Date(currentUser.premiumExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol
              ios_icon_name="person.circle.fill"
              android_material_icon_name="account-circle"
              size={80}
              color={colors.primary}
            />
            {currentUser.verified && (
              <View style={styles.verifiedBadge}>
                <IconSymbol
                  ios_icon_name="checkmark.seal.fill"
                  android_material_icon_name="verified"
                  size={24}
                  color={colors.success}
                />
              </View>
            )}
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>

          {currentUser.premium && (
            <View style={styles.premiumBadge}>
              <IconSymbol
                ios_icon_name="star.fill"
                android_material_icon_name="star"
                size={16}
                color={colors.highlight}
              />
              <Text style={styles.premiumText}>{i18n.t('profile.premiumMember')}</Text>
            </View>
          )}

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>{i18n.t('profile.rating')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.reviewCount}</Text>
              <Text style={styles.statLabel}>{i18n.t('profile.reviews')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.servicesOffered.length}</Text>
              <Text style={styles.statLabel}>{i18n.t('profile.services')}</Text>
            </View>
          </View>
        </View>

        {currentUser.bio && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('profile.about')}</Text>
            <Text style={styles.bioText}>{currentUser.bio}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{i18n.t('profile.contactInfo')}</Text>
          <View style={styles.infoRow}>
            <IconSymbol
              ios_icon_name="phone.fill"
              android_material_icon_name="phone"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.infoText}>{currentUser.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol
              ios_icon_name="location.fill"
              android_material_icon_name="location-on"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.infoText}>{currentUser.location}</Text>
          </View>
        </View>

        {currentUser.skills.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('profile.skills')}</Text>
            <View style={styles.skillsContainer}>
              {currentUser.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {currentUser.premium ? (
          <View style={styles.card}>
            <View style={styles.premiumHeader}>
              <IconSymbol
                ios_icon_name="star.circle.fill"
                android_material_icon_name="stars"
                size={32}
                color={colors.highlight}
              />
              <View style={styles.premiumInfo}>
                <Text style={styles.cardTitle}>{i18n.t('profile.premiumSubscription')}</Text>
                <Text style={styles.premiumExpiry}>
                  {i18n.t('profile.expiresIn', { days: daysUntilExpiry })}
                </Text>
              </View>
            </View>
            <View style={styles.premiumBenefits}>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit1')}</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit2')}</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit3')}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.renewButtonText}>{i18n.t('profile.renewSubscription')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.upgradeHeader}>
              <IconSymbol
                ios_icon_name="star.circle"
                android_material_icon_name="stars"
                size={48}
                color={colors.highlight}
              />
              <Text style={styles.upgradeTitle}>{i18n.t('profile.becomePremium')}</Text>
              <Text style={styles.upgradeSubtitle}>
                {i18n.t('profile.premiumSubtitle')}
              </Text>
            </View>

            <View style={styles.premiumBenefits}>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit1')}</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit2')}</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit3')}</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.benefitText}>{i18n.t('profile.benefit4')}</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceAmount}>49 CHF</Text>
              <Text style={styles.pricePeriod}>{i18n.t('profile.pricePerYear')}</Text>
            </View>

            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>{i18n.t('profile.subscribeNow')}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="briefcase.fill"
                android_material_icon_name="work"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>{i18n.t('profile.myServices')}</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="star.fill"
                android_material_icon_name="star"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>{i18n.t('profile.myReviews')}</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/privacy-settings')}
          >
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="lock.shield.fill"
                android_material_icon_name="security"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>{i18n.t('profile.privacySecurity')}</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="gearshape.fill"
                android_material_icon_name="settings"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>{i18n.t('profile.settings')}</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="questionmark.circle.fill"
                android_material_icon_name="help"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>{i18n.t('profile.helpSupport')}</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${colors.highlight}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  premiumText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  premiumInfo: {
    flex: 1,
  },
  premiumExpiry: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  premiumBenefits: {
    gap: 12,
    marginBottom: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: colors.text,
  },
  renewButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  renewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  upgradeHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  upgradeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 16,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  pricePeriod: {
    fontSize: 18,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  upgradeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  menuSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
});
