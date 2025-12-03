
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { serviceCategories } from '@/data/mockData';

export default function AddServiceScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !category || !price || !location) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    console.log('Service submitted:', { title, description, category, price, location });
    Alert.alert(
      'Sucesso!',
      'Seu serviço foi cadastrado com sucesso e está aguardando aprovação.',
      [
        {
          text: 'OK',
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
          <Text style={styles.title}>Oferecer Serviço</Text>
          <Text style={styles.subtitle}>
            Cadastre seu serviço e comece a receber solicitações
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Título do Serviço <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Limpeza Residencial Completa"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Descrição <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Descreva seu serviço em detalhes..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Categoria <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={[styles.pickerText, !category && styles.pickerPlaceholder]}>
                {category || 'Selecione uma categoria'}
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
                {serviceCategories.map((cat, index) => (
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
                  <Text style={styles.customCategoryLabel}>Categoria não encontrada?</Text>
                  <TextInput
                    style={styles.input}
                    value={customCategory}
                    onChangeText={setCustomCategory}
                    placeholder="Digite uma nova categoria"
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
                    <Text style={styles.addCategoryButtonText}>Adicionar Categoria</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Preço (CHF) <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>CHF</Text>
              <TextInput
                style={[styles.input, styles.priceInputField]}
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Localização <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Ex: Zurique, Suíça"
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
              Seu serviço será revisado pela nossa equipe antes de ser publicado. 
              Isso geralmente leva até 24 horas.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Cadastrar Serviço</Text>
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
