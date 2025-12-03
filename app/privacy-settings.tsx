
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { defaultPrivacySettings } from '@/data/bookingData';
import { i18n } from '@/locales/translations';
import { useRouter } from 'expo-router';

export default function PrivacySettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(defaultPrivacySettings);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Privacy settings saved:', settings);
    Alert.alert(
      i18n.t('privacy.successTitle'),
      i18n.t('privacy.successMessage'),
      [{ text: i18n.t('privacy.ok'), onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t('privacy.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            ios_icon_name="lock.shield.fill"
            android_material_icon_name="security"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.subtitle}>{i18n.t('privacy.subtitle')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('privacy.profileVisibility')}</Text>
          <Text style={styles.sectionDescription}>{i18n.t('privacy.profileVisibilityDesc')}</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  ios_icon_name="phone.fill"
                  android_material_icon_name="phone"
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{i18n.t('privacy.showPhone')}</Text>
                  <Text style={styles.settingDescription}>{i18n.t('privacy.showPhoneDesc')}</Text>
                </View>
              </View>
              <Switch
                value={settings.showPhone}
                onValueChange={() => toggleSetting('showPhone')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  ios_icon_name="envelope.fill"
                  android_material_icon_name="email"
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{i18n.t('privacy.showEmail')}</Text>
                  <Text style={styles.settingDescription}>{i18n.t('privacy.showEmailDesc')}</Text>
                </View>
              </View>
              <Switch
                value={settings.showEmail}
                onValueChange={() => toggleSetting('showEmail')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  ios_icon_name="location.fill"
                  android_material_icon_name="location-on"
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{i18n.t('privacy.showLocation')}</Text>
                  <Text style={styles.settingDescription}>{i18n.t('privacy.showLocationDesc')}</Text>
                </View>
              </View>
              <Switch
                value={settings.showLocation}
                onValueChange={() => toggleSetting('showLocation')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('privacy.communication')}</Text>
          <Text style={styles.sectionDescription}>{i18n.t('privacy.communicationDesc')}</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  ios_icon_name="message.fill"
                  android_material_icon_name="message"
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{i18n.t('privacy.allowMessages')}</Text>
                  <Text style={styles.settingDescription}>{i18n.t('privacy.allowMessagesDesc')}</Text>
                </View>
              </View>
              <Switch
                value={settings.allowMessages}
                onValueChange={() => toggleSetting('allowMessages')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  ios_icon_name="bell.fill"
                  android_material_icon_name="notifications"
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{i18n.t('privacy.allowNotifications')}</Text>
                  <Text style={styles.settingDescription}>{i18n.t('privacy.allowNotificationsDesc')}</Text>
                </View>
              </View>
              <Switch
                value={settings.allowNotifications}
                onValueChange={() => toggleSetting('allowNotifications')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('privacy.dataProtection')}</Text>
          <Text style={styles.sectionDescription}>{i18n.t('privacy.dataProtectionDesc')}</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  ios_icon_name="chart.bar.fill"
                  android_material_icon_name="analytics"
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{i18n.t('privacy.dataSharing')}</Text>
                  <Text style={styles.settingDescription}>{i18n.t('privacy.dataSharingDesc')}</Text>
                </View>
              </View>
              <Switch
                value={settings.dataSharing}
                onValueChange={() => toggleSetting('dataSharing')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <IconSymbol
            ios_icon_name="info.circle.fill"
            android_material_icon_name="info"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.infoText}>{i18n.t('privacy.infoText')}</Text>
        </View>

        <View style={styles.linkSection}>
          <TouchableOpacity style={styles.linkButton}>
            <IconSymbol
              ios_icon_name="doc.text.fill"
              android_material_icon_name="description"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.linkText}>{i18n.t('privacy.privacyPolicy')}</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton}>
            <IconSymbol
              ios_icon_name="doc.text.fill"
              android_material_icon_name="description"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.linkText}>{i18n.t('privacy.termsOfService')}</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton}>
            <IconSymbol
              ios_icon_name="trash.fill"
              android_material_icon_name="delete"
              size={20}
              color={colors.error}
            />
            <Text style={[styles.linkText, { color: colors.error }]}>{i18n.t('privacy.deleteAccount')}</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{i18n.t('privacy.saveSettings')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 48 : 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  settingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: `${colors.primary}15`,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  linkSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
