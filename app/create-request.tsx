
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { getServiceCategories } from '@/data/mockData';
import { i18n } from '@/locales/translations';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateRequestScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(undefined);
  const [preferredTime, setPreferredTime] = useState<Date | undefined>(undefined);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [categories, setCategories] = useState(getServiceCategories());

  useEffect(() => {
    setCategories(getServiceCategories());
  }, []);

  const handleSubmit = () => {
    if (!title || !description || !category || !budget || !location) {
      Alert.alert(i18n.t('createRequest.errorTitle'), i18n.t('createRequest.errorMessage'));
      return;
    }

    console.log('Request submitted:', {
      title,
      description,
      category,
      budget,
      location,
      preferredDate,
      preferredTime,
    });

    Alert.alert(
      i18n.t('createRequest.successTitle'),
      i18n.t('createRequest.successMessage'),
      [
        {
          text: i18n.t('createRequest.ok'),
          onPress: () => router.back(),
        },
      ]
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
        <Text style={styles.headerTitle}>{i18n.t('createRequest.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            ios_icon_name="doc.text.fill"
            android_material_icon_name="description"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.subtitle}>{i18n.t('createRequest.subtitle')}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('createRequest.requestTitle')} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder={i18n.t('createRequest.requestTitlePlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('createRequest.description')} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder={i18n.t('createRequest.descriptionPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('createRequest.category')} <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={[styles.pickerText, !category && styles.pickerPlaceholder]}>
                {category || i18n.t('createRequest.categoryPlaceholder')}
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
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('createRequest.budget')} <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>CHF</Text>
              <TextInput
                style={[styles.input, styles.priceInputField]}
                value={budget}
                onChangeText={setBudget}
                placeholder={i18n.t('createRequest.budgetPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {i18n.t('createRequest.location')} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder={i18n.t('createRequest.locationPlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{i18n.t('createRequest.preferredDate')}</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.pickerText, !preferredDate && styles.pickerPlaceholder]}>
                {preferredDate ? preferredDate.toLocaleDateString() : i18n.t('createRequest.selectDate')}
              </Text>
              <IconSymbol
                ios_icon_name="calendar"
                android_material_icon_name="calendar-today"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{i18n.t('createRequest.preferredTime')}</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={[styles.pickerText, !preferredTime && styles.pickerPlaceholder]}>
                {preferredTime ? preferredTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : i18n.t('createRequest.selectTime')}
              </Text>
              <IconSymbol
                ios_icon_name="clock"
                android_material_icon_name="access-time"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={preferredDate || new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setPreferredDate(selectedDate);
                }
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={preferredTime || new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedTime) {
                  setPreferredTime(selectedTime);
                }
              }}
            />
          )}

          <View style={styles.infoBox}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.infoText}>{i18n.t('createRequest.infoText')}</Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{i18n.t('createRequest.submit')}</Text>
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
    maxHeight: 300,
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
