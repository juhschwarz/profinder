
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { getServiceCategories } from '@/data/mockData';
import { i18n } from '@/locales/translations';

export default function AddServiceScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState(getServiceCategories());

  // Update categories when language changes
  useEffect(() => {
    setCategories(getServiceCategories());
  }, []);

  const handleSubmit = () => {
    if (!title || !description || !category || !price || !location) {
      Alert.alert(i18n.t('addService.errorTitle'), i18n.t('addService.errorMessage'));
      return;
    }

    console.log('Service submitted:', { title, description, category, price, location });
    Alert.alert(
      i18n.t('addService.successTitle'),
      i18n.t('addService.successMessage'),
      [
        {
          text: i18n.t('addService.ok'),
          onPress: () => {
            setTitle('');
            setDescription('');
            setCategory('');
            setPrice('');
            setLocation('');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            ios_icon_name="plus.circle.fill"
            android_material_icon_name="add-circle"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>{i18n.t('addService.title')}</Text>
          <Text style={styles.subtitle}>
            {i18n.t('addService.subtitle')}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('addService.serviceTitle')} <Text style={styles.required}>{i18n.t('addService.required')}</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder={i18n.t('addService.serviceTitlePlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('addService.description')} <Text style={styles.required}>{i18n.t('addService.required')}</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder={i18n.t('addService.descriptionPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('addService.category')} <Text style={styles.required}>{i18n.t('addService.required')}</Text>
            </Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={[styles.pickerText, !category && styles.pickerPlaceholder]}>
                {category || i18n.t('addService.categoryPlaceholder')}
              </Text>
              <IconSymbol
                ios_icon_name="chevron.down"
                android_material_icon_name="expand-more"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showCategoryPicker && (
              <View style={styles.categoryList}>
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryItem}
                    onPress={() => {
                      setCategory(cat.name);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <IconSymbol
                      ios_icon_name={cat.icon}
                      android_material_icon_name={cat.icon as any}
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.categoryItemText}>{cat.name}</Text>
                    {category === cat.name && (
                      <IconSymbol
                        ios_icon_name="checkmark"
                        android_material_icon_name="check"
                        size={24}
                        color={colors.success}
                      />
                    )}
                  </TouchableOpacity>
                ))}
                <View style={styles.customCategorySection}>
                  <Text style={styles.customCategoryLabel}>{i18n.t('addService.categoryNotFound')}</Text>
                  <TextInput
                    style={styles.input}
                    value={customCategory}
                    onChangeText={setCustomCategory}
                    placeholder={i18n.t('addService.newCategoryPlaceholder')}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TouchableOpacity
                    style={styles.addCategoryButton}
                    onPress={() => {
                      if (customCategory.trim()) {
                        setCategory(customCategory.trim());
                        setCustomCategory('');
                        setShowCategoryPicker(false);
                      }
                    }}
                  >
                    <Text style={styles.addCategoryButtonText}>{i18n.t('addService.addCategory')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('addService.price')} <Text style={styles.required}>{i18n.t('addService.required')}</Text>
            </Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>CHF</Text>
              <TextInput
                style={[styles.input, styles.priceInputField]}
                value={price}
                onChangeText={setPrice}
                placeholder={i18n.t('addService.pricePlaceholder')}
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('addService.location')} <Text style={styles.required}>{i18n.t('addService.required')}</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder={i18n.t('addService.locationPlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.infoBox}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.infoText}>
              {i18n.t('addService.infoText')}
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{i18n.t('addService.submit')}</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  required: {
    color: colors.error,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 120,
  },
  pickerButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerText: {
    fontSize: 16,
    color: colors.text,
  },
  pickerPlaceholder: {
    color: colors.textSecondary,
  },
  categoryList: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryItemText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  customCategorySection: {
    padding: 16,
    gap: 12,
    backgroundColor: colors.background,
  },
  customCategoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  addCategoryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addCategoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingLeft: 16,
  },
  priceInputField: {
    flex: 1,
    borderWidth: 0,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: `${colors.primary}15`,
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
